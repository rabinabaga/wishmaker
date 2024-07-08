const router = require("express").Router();
// const GamePlanModel = require('./game_plan.model');

const checkAuthentication = require("../../../middlewares/auth.middleware");

const checkPermission = require("../../../middlewares/rbac.middleware");


router.get("/", checkAuthentication,checkPermission("admin"), (req, res) => {
  res.json("Hello Analytics");
});

module.exports = router;
