const router = require('express').Router();
// const GamePlanModel = require('./game_plan.model');
const upload = require("../../upload");
const campaignCtrl = require('./campaign.controller');
const checkAuthentication = require("../../middlewares/auth.middleware");


// const checkPermission = require("../../middlewares/rbac.middleware")

//   router.post(
//   "/",
//   upload.single("imageSrc"),
//   (req, res, next) => {
//   console.log("req.file", req.file, "req.body", req.body);}
// );
router.post(
  "/",
 upload.single("imageSrc"),
  checkAuthentication,
  campaignCtrl.createCampaign
);
router.get(
  "/",
  checkAuthentication,
  campaignCtrl.getAllCampaigns
);
// router.delete("/:id", checkAuthentication, gamePlanCtrl.deleteGamePlan);

// router.delete("/:id", checkAuthentication, gamePlanCtrl.createGamePlan);
// router.put("/:id",checkAuthentication, gamePlanCtrl.createGamePlan);

// //http://localhost:3000/api/v1/banner?search=string&page=2
// router.get("/",checkAuthentication, gamePlanCtrl.showAllGamePlan);

// // router.get('/me',checkAuthentication,authCtrl.profile)
// router.get('/admin',checkAuthentication,checkPermission('admin'), authCtrl.adminPage);

module.exports = router;