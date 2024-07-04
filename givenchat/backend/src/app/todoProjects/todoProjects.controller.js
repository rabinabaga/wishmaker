const todoProjectsSvc = require("./todoProjects.service.js");

class TodoProjectsController {
  todoProjectsSvc;
  constructor(svc) {
    this.todoProjectsSvc = svc;
  }
  async createtodoProjects(req, res, next) {
    try {
      let newtodoProjects = await todoProjectsSvc.createtodoProjects(req);

      res.json({
        result: newtodoProjects,
        message: "new  todo project created successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async showAllTodoProjects(req, res, next) {
    try {
      // let search = req.query.search ?? null;
console.log("all todos");
      let limit = 60;
      let skip = 0;
      // let currentPage = Number(req.query.page) ?? 3;
      // //100, 1=>to 9 index.
      // let skip = (currentPage - 1) * limit;
      // let filter = { createdBy: req.authUser._id };
      // let count = await projectSvc.totalCount(filter);
      // // console.log(filter);
      let projects = await todoProjectsSvc.listAllProjects( {
        skip: skip,
        limit: limit,
      });

      res.json({
        result: projects,
        message: "projects fetched successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const todoProjectsCtrl = new TodoProjectsController();
module.exports = todoProjectsCtrl;
