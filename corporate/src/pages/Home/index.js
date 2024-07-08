import React, { useState, useEffect, useCallback } from "react";
import KhaltiCheckout from "khalti-checkout-web";
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
import { Link, json, useHref, useNavigate } from "react-router-dom";
import taskImg from "../../assets/images/task.png";
import DeleteModal from "../../Components/Common/DeleteModal";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//import action
import { getCampaignsPageAsync } from "../../slices/thunks";
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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCampaignForDonation, setActiveCampaignForDonation] =
    useState(null);
  console.log("active campaign for daonation", activeCampaignForDonation);
  document.title = "To Do Lists |  - React Admin & Dashboard Template";
  const [file, setFile] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const campaignStore = useSelector(
    (state) => state.CampaignsAsync.campaignsDataAsync
  );

  let formData = new FormData();
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    // formData.append("imageSrc", e.target.files[0]);
  };

  const [campaign, setCampaign] = useState(null);
  const [modalCampaign, setModalCampaign] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    console.log("in dispatch get campaigns");
    dispatch(getCampaignsPageAsync());
  }, []);

  const [campaignDataPost, setcampaignDataPost] = useState(null);
  const toggleCampaignModal = () => setModalCampaign(!modalCampaign);

  // Add To do
  const handleTodoClicks = () => {
    setCampaign("");
    setModalCampaign(!modalCampaign);
    setIsEdit(false);
    toggleCampaignModal();
  };

  const [amountPledged, setAmountPledged] = useState(0);

  const campaignValidation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      campaignTitle: (campaign && campaign?.campaignTitle) || "",
      goalAmount: (campaign && campaign?.goalAmount) || "",
    },
    validationSchema: Yup.object({
      campaignTitle: Yup.string().required("Please Enter Campaign Title"),
      goalAmount: Yup.number().required("Please Enter Campaign Goal Amount"),
    }),
    onSubmit: async (values) => {
      console.log("formdata", "after handlefilechnage, ", formData);
      formData.append("campaignTitle", values.campaignTitle);
      formData.append("goalAmount", values.goalAmount);
      console.log("file", file);
      formData.append("imageSrc", file);
      console.log("formdata", "appending fields handlefilechnage, ", formData);

      setcampaignDataPost(formData);

      // dispatch(addTodoTodoPageAsync(newCampaign));
      // save new Folder
      // dispatch(addTodoTodoPageAsync(newCampaign));
      try {
        const config = {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NWVkMDg0ZDVhM2Y4NTQ5MDlkMDIzNSIsImlhdCI6MTcyMDQwNTM2OSwiZXhwIjoxNzIyOTk3MzY5fQ.PoBnUH_M5MflKBD3QwOEF55pvQMt3LWGw5SBbwcWLn4`,
          },
        };

        const { data } = await axios.post("/campaign", formData, config);
        alert("photo uploaded successfully");
      } catch (err) {
        console.log("failed to upload photos", err);
      }

      validation.resetForm();

      toggle();
    },
  });

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
                <div className="row">
                  {(campaignStore || []).map((item) => {
                    return (
                      <>
                        <div className="card col-md-3">
                          <img
                            className="card-img-top object-fit-cover"
                            style={{ height: "200px" }}
                            src={`http://localhost:8001/images/${item.imageSrc}`}
                            alt="Card image cap"
                          />

                          <p>
                            Campaign Title:
                            <h6 className="fs-18 fw-semibold">
                              {item.campaignTitle}
                            </h6>{" "}
                          </p>
                          <p>
                            Goal Amount:{" "}
                            <h6 className="fs-18 fw-semibold">
                              {item.goalAmount}
                            </h6>{" "}
                          </p>
                          <p>Started By: {item.campaigner_id.name}</p>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              handleDonateToCampaignClicks();
                              setActiveCampaignForDonation(item);
                            }}
                          >
                            Donate Now
                          </button>
                        </div>
                      </>
                    );
                  })}
                </div>
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
        <ModalHeader
          toggle={toggleCampaignModal}
          className="p-3 bg-success-subtle"
        >
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
                onClick={() => toggleCampaignModal}
              >
                <i className="ri-close-fill align-bottom"></i> Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => toggleCampaignModal}
                id="addNewTodo"
              >
                {!!isEdit ? "Save" : "Create Campaign"}
              </button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default Home;
