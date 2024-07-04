const router = require("express").Router();

const todoProjectsCtrl = require("./todoProjects.controller");
const checkAuthentication = require("../../middlewares/auth.middleware");

// const checkPermission = require("../../middlewares/rbac.middleware")

router.post("/", checkAuthentication, todoProjectsCtrl.createtodoProjects);
// router.put("/", checkAuthentication, gamePlanCtrl.createGamePlan);

//http://localhost:3000/api/v1/banner?search=string&page=2
router.get("/", checkAuthentication, todoProjectsCtrl.showAllTodoProjects);

// router.get('/me',checkAuthentication,authCtrl.profile)
// router.get('/admin',checkAuthentication,checkPermission('admin'), authCtrl.adminPage);

module.exports = router;
