const router = require('express').Router();
const GamePlanModel = require('./game_plan.model');

const gamePlanCtrl = require('./game_plan.controller');
const checkAuthentication = require("../../middlewares/auth.middleware");


// const checkPermission = require("../../middlewares/rbac.middleware")



router.post("/",checkAuthentication, gamePlanCtrl.createGamePlan);
router.delete("/:id", checkAuthentication, gamePlanCtrl.deleteGamePlan);

router.delete("/:id", checkAuthentication, gamePlanCtrl.createGamePlan);
router.put("/:id",checkAuthentication, gamePlanCtrl.createGamePlan);

//http://localhost:3000/api/v1/banner?search=string&page=2
router.get("/",checkAuthentication, gamePlanCtrl.showAllGamePlan);

// router.get('/me',checkAuthentication,authCtrl.profile)
// router.get('/admin',checkAuthentication,checkPermission('admin'), authCtrl.adminPage);

module.exports = router;