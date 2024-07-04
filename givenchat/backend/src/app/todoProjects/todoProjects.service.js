const TodoProjectsModel = require("./todoProjects.model");

class todoProjectsService {
  async createtodoProjects(req) {
    console.log("req body in todo project service", req.body);

    let response;
    let status;
    if (req.body._id) {
      // console.log("inside req body with _id");
      status = req.body.status;
      try {
        response = await TodoProjectsModel.findByIdAndUpdate(
          { _id: req.body._id },
          {
            status: status,
            steps: req.body.steps,
            start_time: req.body.start_time,
            completed_time: req.body.completed_time,
          },
          { new: true }
        );
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      let newtodoProject;
     
      console.log("inside req body with _id");

      try {
         newtodoProject = new TodoProjectsModel({
           title: req.body.title,
         
         });
        response = await newtodoProject.save();
      } catch (exception) {
        console.log("exception", exception);
        throw exception;
      }
    }

    return response;
  }

  listAllProjects = async (filter = {}, paging = { skip: 0, limit: 8 }) => {
    try {
      const projects = await TodoProjectsModel.find()
       
console.log("projects", projects);
      return projects;
    } catch (exception) {
      throw exception;
    }
  };
}

const todoProjectsSvc = new todoProjectsService();
module.exports = todoProjectsSvc;
