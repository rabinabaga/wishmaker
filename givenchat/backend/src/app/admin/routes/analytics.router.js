const router = require("express").Router();
// const GamePlanModel = require('./game_plan.model');

const checkAuthentication = require("../../../middlewares/auth.middleware");

router.get("/", checkAuthentication, (req, res) => {
  res.json("Hello Analytics");
});

module.exports = router;
