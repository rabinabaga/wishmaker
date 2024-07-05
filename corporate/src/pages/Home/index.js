import React, { useState, useEffect, useCallback } from "react";
import {
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledCollapse,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import Flatpickr from "react-flatpickr";
import Dragula from "react-dragula";
import { ToastContainer } from "react-toastify";
import { Link, useHref } from "react-router-dom";
import taskImg from "../../assets/images/task.png";
import DeleteModal from "../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

// Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar6 from "../../assets/images/users/avatar-6.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";
import avatar8 from "../../assets/images/users/avatar-8.jpg";
import avatar9 from "../../assets/images/users/avatar-9.jpg";
import avatar10 from "../../assets/images/users/avatar-10.jpg";

//import action
import {
  getProjectsTodoPageAsync,
  addTodoTodoPage,
  addTodoTodoPageAsync,
  addProjectTodoPageAsync,
  getTodoTodoPageAsync,
  deleteTodoTodoPageAsync,
  updateTodoTodoPageAsync,
} from "../../slices/thunks";
import { createSelector } from "reselect";
import axios from "axios";

const Status = ({ status }) => {
  switch (status) {
    case "New":
      return (
        <span className="badge bg-info-subtle text-info text-uppercase">
          {status}
        </span>
      );
    case "Pending":
      return (
        <span className="badge bg-warning-subtle text-warning text-uppercase">
          {status}
        </span>
      );
    case "Inprogress":
      return (
        <span className="badge bg-secondary-subtle text-secondary text-uppercase">
          {status}
        </span>
      );
    case "Completed":
      return (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {status}
        </span>
      );
    default:
      return (
        <span className="badge bg-success-subtle text-success text-uppercase">
          {status}
        </span>
      );
  }
};

const Priority = ({ priority }) => {
  switch (priority) {
    case "High":
      return <span className="badge bg-danger text-uppercase">{priority}</span>;
    case "Medium":
      return (
        <span className="badge bg-warning text-uppercase">{priority}</span>
      );
    case "Low":
      return (
        <span className="badge bg-success text-uppercase">{priority}</span>
      );
    default:
      return (
        <span className="badge bg-success text-uppercase">{priority}</span>
      );
  }
};

const Home = () => {
  const dispatch = useDispatch();
  document.title = "To Do Lists |  - React Admin & Dashboard Template";
  const [file, setFile] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const todosStore = useSelector((state) => state.TodoAsync.todosData);

  console.log("todos store", todosStore);
  const projects = useSelector((state) => state.TodoAsync.projectsDataAsync);
  let formData = new FormData();
  const [todos, setTodos] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    formData.append("imageSrc", e.target.files[0]);
  };
  useEffect(() => {
    console.log("todo store", todosStore);
    setTodos(todosStore);
    if (selectedProject === null) {
      setTaskList(todosStore);
    } else {
      handleProjectSelect(todosStore, selectedProject._id);
    }
  }, [todosStore]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [todo, setTodo] = useState(null);
  const [campaign, setCampaign] = useState(null);
  // Projects
  const [modalProject, setModalProject] = useState(false);

  // To do Task List
  // To dos
  const [modalTodo, setModalTodo] = useState(false);
  const [modalCampaign, setModalCampaign] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getProjectsTodoPageAsync());
  }, []);
  useEffect(() => {
    dispatch(getTodoTodoPageAsync());
  }, []);

  // useEffect(() => {
  //   if (todo !== null) {
  //     const newTodos = [...todos, todo];
  //     console.log("newtodos", newTodos);
  //     const filteredTaskListForProject = newTodos.filter((item) => {
  //       return item.project_id === selectedProject._id;
  //     });
  //     console.log(
  //       "todo true,",
  //       filteredTaskListForProject,
  //       selectedProject._id,
  //       selectedProject.title
  //     );
  //     setTaskList(filteredTaskListForProject);
  //     setTodo(null);
  //   }
  // }, [todo]);

  const toggle = useCallback(() => {
    if (modalTodo) {
      setModalTodo(false);
      setTodo(null);
    } else {
      setModalTodo(true);
    }
  }, [modalTodo]);

  // const toggleCampaignModal = useCallback(() => {
  //   if (modalCampaign) {
  //     setModalCampaign(false);
  //     setCampaign(null);
  //   } else {
  //     setModalCampaign(true);
  //   }
  // }, [modalCampaign]);

  const [campaignDataPost, setcampaignDataPost] = useState(null);
  const toggleCampaignModal = () => setModalCampaign(!modalCampaign);

  // Toggle Project Modal
  const toggleProject = () => {
    if (modalProject) {
      setModalProject(false);
    } else {
      setModalProject(true);
    }
  };
  console.log("projects", projects);

  console.log("todo after cicking updae", todo);
  // Update To do
  const handleTodoClick = (arg) => {
    console.log("new task alert,4 5 components responsive refer to velzone");
    const todo = arg;

    setTodo({
      _id: todo._id,
      title: todo.title,
      status: todo.status,

      project_id: todo.project_id,
      priority: todo.priority,
    });

    setIsEdit(true);
    toggle();
  };

  // Add To do
  const handleTodoClicks = () => {
    setCampaign("");
    setModalCampaign(!modalCampaign);
    setIsEdit(false);
    toggleCampaignModal();
  };

  // Delete To do
  const onClickTodoDelete = (todo) => {
    setTodo(todo);
    setDeleteModal(true);
  };

  const handleDeleteTodo = () => {
    if (todo) {
      dispatch(deleteTodoTodoPageAsync(todo._id));
      setDeleteModal(false);
    }
  };

  const sortbystatus = [
    {
      options: [
        { label: "COMPLETED", value: "COMPLETED" },
        { label: "IN PROGRESS", value: "IN PROGRESS" },
        { label: "NEW", value: "NEW" },
        { label: "PENDING", value: "PENDING" },
      ],
    },
  ];

  const sortbypriority = [
    {
      options: [
        { label: "High", value: "high" },
        { label: "Medium", value: "medium" },
        { label: "Low", value: "Low" },
      ],
    },
  ];

  // const taskStatus = (e) => {
  //   if (e) {
  //     setTaskList(todos.filter((item) => item.status === e));
  //   } else {
  //     setTaskList(todos.filter((item) => item.status !== e));
  //   }
  // };

  // const searchList = (e) => {
  //   let inputVal = e.toLowerCase();

  //   function filterItems(arr, query) {
  //     return arr.filter(function (el) {
  //       return el.task.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  //     });
  //   }

  //   let filterData = filterItems(todos, inputVal);
  //   setTaskList(filterData);
  //   if (filterData.length === 0) {
  //     document.getElementById("noresult").style.display = "block";
  //     document.getElementById("todo-task").style.display = "none";
  //   } else {
  //     document.getElementById("noresult").style.display = "none";
  //     document.getElementById("todo-task").style.display = "block";
  //   }
  // };

  // const taskSort = (e) => {
  //   if (e) {
  //     setTaskList([...todos].sort((a, b) => a.id - b.id));
  //     setTaskList(
  //       [...todos].sort((a, b) => {
  //         let x = a.task.toLowerCase();
  //         let y = b.task.toLowerCase();
  //         if (x < y) {
  //           return -1;
  //         } else if (x > y) {
  //           return 1;
  //         } else {
  //           return 0;
  //         }
  //       })
  //     );
  //   }
  // };

  // const changeTaskStatus = (e) => {
  //   const activeTask = e.target.value;
  //   let activeTaskList;
  //   if (e.target.checked) {
  //     activeTaskList = taskList.map((item) => {
  //       const tasks = Object.assign({}, item);
  //       if (tasks.id === activeTask) {
  //         tasks.status = "Completed";
  //       }
  //       return tasks;
  //     });
  //   } else {
  //     activeTaskList = taskList.map((item) => {
  //       const tasks = Object.assign({}, item);
  //       if (tasks.id === activeTask) {
  //         tasks.status = "Inprogress";
  //       }
  //       return tasks;
  //     });
  //   }
  //   setTaskList(activeTaskList);
  // };

  // Project validation
  // validation
  const projectValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Project Title"),
    }),
    onSubmit: (values) => {
      const newProjectData = {
        title: values.title,
      };
      // save new Project Data
      //add to local storage
      dispatch(addProjectTodoPageAsync(newProjectData));
      projectValidation.resetForm();
      toggleProject();
    },
  });

  // To do Task List validation
  // To do Task List validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      task: (todo && todo?.title) || "",
      status: (todo && todo?.status) || "",
      project: selectedProject?._id || "",
      priority: (todo && todo?.priority) || "",
    },
    validationSchema: Yup.object({
      task: Yup.string().required("Please Enter Task"),
      // dueDate: Yup.string().required("Please Enter Date"),
      status: Yup.string().required("Please Enter Status"),

      project: Yup.string().required("Please select Project "),
      priority: Yup.string().required("Please Enter Priority"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        console.log("here in onsubmit eidit", values);
        const updateTodo = {
          _id: todo ? todo?._id : 0,
          title: values.task,
          status: values.status,
          project_id: values.project,
          priority: values.priority,
        };
        // save edit Folder
        dispatch(updateTodoTodoPageAsync(updateTodo));
        console.log("todos after dispatch in update", todos);
        const newUpdatedTodos = todos.map((item) => {
          if (item._id === todo._id) {
            return updateTodo;
          } else {
            return item;
          }
        });
        handleProjectSelect(newUpdatedTodos, selectedProject._id);
        setTodo(null);
        validation.resetForm();
        toggle();
      } else {
        const newTodo = {
          title: values.task,
          status: values.status,
          project_id: values.project,
          priority: values.priority,
        };
        setTodo(newTodo);
        let newTodos;
        //save to local storage
        if (newTodo) {
          newTodos = [...todos, newTodo];
        } else {
          newTodos = todos;
        }
        console.log(newTodo);
        dispatch(addTodoTodoPageAsync(newTodo));
        // save new Folder
        validation.resetForm();

        toggle();
      }
    },
  });
  const campaignValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      campaignTitle: (campaign && campaign?.campaignTitle) || "",
      imageFile: (campaign && campaign?.imageFile) || "",
      goalAmount: (campaign && campaign?.goalAmount) || "",
    },
    validationSchema: Yup.object({
      campaignTitle: Yup.string().required("Please Enter Campaign Title"),
      goalAmount: Yup.number().required("Please Enter Campaign Goal Amount"),
      // dueDate: Yup.string().required("Please Enter Date"),
      // imageFile: Yup.mixed()
      //   .required("required")
      //   .test("fileFormat", "Only JPG and JPEG files are allowed", (value) => {
      //     if (value) {
      //       const supportedFormats = ["jpg", "jpeg"];
      //       return supportedFormats.includes(value.name.split(".").pop());
      //     }
      //     return true;
      //   })
      //   .test("fileSize", "File size must be less than 3MB", (value) => {
      //     if (value) {
      //       return value.size <= 3145728;
      //     }
      //     return true;
      //   }),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        console.log("here in onsubmit eidit", values);
        const updateTodo = {
          _id: todo ? todo?._id : 0,
          title: values.task,
          status: values.status,
          project_id: values.project,
          priority: values.priority,
        };
        // save edit Folder
        dispatch(updateTodoTodoPageAsync(updateTodo));
        console.log("todos after dispatch in update", todos);
        const newUpdatedTodos = todos.map((item) => {
          if (item._id === todo._id) {
            return updateTodo;
          } else {
            return item;
          }
        });
        handleProjectSelect(newUpdatedTodos, selectedProject._id);
        setTodo(null);
        validation.resetForm();
        toggle();
      } else {
        const newCampaign = {
          campaignTitle: values.campaignTitle,
          imageSrc: file,
          goalAmount: values.goalAmount,
        };
        setCampaign(newCampaign);
        campaignDataPost;
        formData.append("campaignTitle", values.campaignTitle);
        formData.append("goalAmount", values.goalAmount);

        setcampaignDataPost(formData);

        // dispatch(addTodoTodoPageAsync(newCampaign));
        // save new Folder
        // dispatch(addTodoTodoPageAsync(newCampaign));
        try {
          const config = {
            headers: {
              "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVkMDg0ZDVhM2Y4NTQ5MDlkMDIzNSIsImlhdCI6MTcyMDE1NTUyNiwiZXhwIjoxNzIwMjQxOTI2fQ.Unr1EguofUxThB4y1FL-C24YIqQPwc9Hm1o3vNu5nPo`,
              "Content-Type": "multipart/form-data",
            },
          };  
          

          const { data } = await axios.post(
            "/campaign",
           campaignDataPost,
            config
          );
          alert("photo uploaded successfully");
        } catch (err) {
          console.log("failed to upload photos", err);
        }

        validation.resetForm();

        toggle();
      }
    },
  });

  const handleProjectSelect = (newTodos, _id) => {
    const selectedProject = projects.filter((item) => {
      console.log("id item id", _id, item._id);
      return item._id === _id;
    });

    setSelectedProject(selectedProject[0]);
    const filterdTasksList = newTodos.filter((item) => item.project_id === _id);
    setTaskList(filterdTasksList);
  };

  const dragulaDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      let options = {};
      Dragula([componentBackingInstance], options);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteTodo()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <div className="chat-wrapper d-lg-flex gap-1 mx-n4  p-1">
            <div className="file-manager-sidebar">
              <div className="p-4 d-flex flex-column h-100">
                <div className="mb-3">
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setModalProject(true)}
                  >
                    <i className="ri-add-line align-bottom"></i> Add Project
                  </button>
                </div>

                <div className="mt-auto text-center">
                  <img src={taskImg} alt="Task" className="img-fluid" />
                </div>
              </div>
            </div>
            <div className="file-manager-content w-100 p-4 pb-0">
              <Row className="mb-4">
                <div className="col-auto order-1 d-block d-lg-none">
                  <button
                    type="button"
                    className="btn btn-soft-success btn-icon btn-sm fs-16 file-menu-btn"
                  >
                    <i className="ri-menu-2-fill align-bottom"></i>
                  </button>
                </div>
                <div className="col-sm order-3 order-sm-2 mt-3 mt-sm-0">
                  <h5 className="fw-semibold mb-0">
                    Admin & Dashboard{" "}
                    <span className="badge bg-primary align-bottom ms-2">
                      v2.0.0
                    </span>
                  </h5>
                </div>

                <div className="col-auto order-2 order-sm-3 ms-auto">
                  <div className="hstack gap-2">
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic example"
                    >
                      <button className="btn btn-icon fw-semibold btn-soft-danger">
                        <i className="ri-arrow-go-back-line"></i>
                      </button>
                      <button className="btn btn-icon fw-semibold btn-soft-success">
                        <i className="ri-arrow-go-forward-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </Row>
              <div className="p-3 bg-light rounded mb-4">
                <Row className="g-2">
                  <Col className="col-lg-auto">
                    <select
                      className="form-control"
                      name="choices-select-sortlist"
                      id="choices-select-sortlist"
                      onChange={(e) => taskSort(e.target.value)}
                    >
                      <option value="">Sort</option>
                      <option value="By ID">By ID</option>
                      <option value="By Name">By Name</option>
                    </select>
                  </Col>
                  <Col className="col-lg-auto">
                    <select
                      className="form-control"
                      name="choices-select-status"
                      id="choices-select-status"
                      onChange={(e) => taskStatus(e.target.value)}
                    >
                      <option value="">All Tasks</option>
                      <option value="Completed">Completed</option>
                      <option value="Inprogress">Inprogress</option>
                      <option value="Pending">Pending</option>
                      <option value="New">New</option>
                    </select>
                  </Col>
                  <Col className="col-lg">
                    <div className="search-box">
                      <input
                        type="text"
                        id="searchTaskList"
                        className="form-control search"
                        placeholder="Search Campaign"
                        onKeyUp={(e) => searchList(e.target.value)}
                      />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </Col>
                  <Col className="col-lg-auto">
                    <button
                      className="btn btn-primary createTask"
                      type="button"
                      onClick={() => handleTodoClicks()}
                    >
                      <i className="ri-add-fill align-bottom" /> Create Campaign
                    </button>
                  </Col>
                </Row>
              </div>

              <div
                className="todo-content position-relative px-4 mx-n4"
                id="todo-content"
              >
                {!todos && (
                  <div id="elmLoader">
                    <div
                      className="spinner-border text-primary avatar-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Modal
        id="createCampaign"
        isOpen={modalCampaign}
        toggle={toggleCampaignModal}
        modalClassName="zoomIn"
        centered
        tabIndex="-1"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-success-subtle">
          {" "}
          {!!isEdit ? "Edit Campaign" : "Create Campaign"}{" "}
        </ModalHeader>
        <ModalBody>
          <div id="task-error-msg" className="alert alert-danger py-2"></div>
          <Form
            id="createCampaign-form"
            onSubmit={(e) => {
              console.log("here in submit campaign", campaignValidation.values);
              e.preventDefault();
              campaignValidation.handleSubmit();
              return false;
            }}
          >
            <input type="hidden" id="taskid-input" className="form-control" />
            <div className="mb-3">
              <label htmlFor="task-title-input" className="form-label">
                Campaign Title
              </label>
              <Input
                type="text"
                id="task-title-input"
                className="form-control"
                placeholder="Enter Campaign title"
                name="campaignTitle"
                validate={{ required: { value: true } }}
                onChange={campaignValidation.handleChange}
                onBlur={campaignValidation.handleBlur}
                value={campaignValidation.values.campaignTitle || ""}
                invalid={
                  campaignValidation.touched.campaignTitle &&
                  campaignValidation.errors.campaignTitle
                    ? true
                    : false
                }
              />
              {campaignValidation.touched.campaignTitle &&
              campaignValidation.errors.campaignTitle ? (
                <FormFeedback type="invalid">
                  {campaignValidation.errors.campaignTitle}
                </FormFeedback>
              ) : null}
            </div>

            <Row className="g-4 mb-3">
              <Col lg={6}>
                <label htmlFor="task-status" className="form-label">
                  Goal Amount
                </label>

                <Input
                  name="goalAmount"
                  type="number"
                  id="status-field"
                  onChange={campaignValidation.handleChange}
                  onBlur={campaignValidation.handleBlur}
                  value={campaignValidation.values.goalAmount || ""}
                >
                  {campaignValidation.touched.goalAmount &&
                  campaignValidation.errors.goalAmount ? (
                    <FormFeedback type="invalid">
                      {campaignValidation.errors.goalAmount}
                    </FormFeedback>
                  ) : null}
                </Input>
                {campaignValidation.touched.goalAmount &&
                campaignValidation.errors.goalAmount ? (
                  <FormFeedback type="invalid">
                    {campaignValidation.errors.goalAmount}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={6}>
                <label htmlFor="task-project" className="form-label">
                  Campaign Cover Image
                </label>
                <input
                  id="files"
                  onChange={handleFileChange}
                  name="imageSrc"
                  type="file"
                  className=" w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </Col>
            </Row>

            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-ghost-success"
                onClick={() => setModalTodo(false)}
              >
                <i className="ri-close-fill align-bottom"></i> Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => setModalCampaign(false)}
                id="addNewTodo"
              >
                {!!isEdit ? "Save" : "Create Campaign"}
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>

      {/* Projects */}
      <Modal
        id="createProjectModal"
        isOpen={modalProject}
        toggle={() => setModalProject(!modalProject)}
        modalClassName="zoomIn"
        tabIndex="-1"
        centered
      >
        <ModalHeader
          toggle={() => setModalProject(!modalProject)}
          className="p-3 bg-success-subtle"
          id="createProjectModalLabel"
        >
          Create Project
        </ModalHeader>
        <ModalBody>
          <form
            className="needs-validation createProject-form"
            onSubmit={(e) => {
              e.preventDefault();
              projectValidation.handleSubmit();
              return false;
            }}
          >
            <div className="mb-4">
              <label htmlFor="projectname-input" className="form-label">
                Project Name
              </label>
              <Input
                type="text"
                className="form-control"
                id="projectname-input"
                name="title"
                placeholder="Enter project name"
                validate={{
                  required: { value: true },
                }}
                onChange={projectValidation.handleChange}
                onBlur={projectValidation.handleBlur}
                value={projectValidation.values.title || ""}
                invalid={
                  projectValidation.touched.title &&
                  projectValidation.errors.title
                    ? true
                    : false
                }
              />
              {projectValidation.touched.title &&
              projectValidation.errors.title ? (
                <FormFeedback type="invalid">
                  {projectValidation.errors.title}
                </FormFeedback>
              ) : null}
              <input
                type="hidden"
                className="form-control"
                id="projectid-input"
                value=""
              />
            </div>
            <div className="hstack gap-2 justify-content-end">
              <button
                type="button"
                className="btn btn-ghost-success"
                onClick={() => setModalProject(false)}
              >
                <i className="ri-close-line align-bottom"></i> Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                id="addNewProject"
              >
                Add Project
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Home;
