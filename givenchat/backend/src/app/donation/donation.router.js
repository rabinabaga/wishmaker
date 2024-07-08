const router = require("express").Router();
// const GamePlanModel = require('./game_plan.model');

const donationCtrl = require("./donation.controller");
const checkAuthentication = require("../../middlewares/auth.middleware");


router.post(
  "/initialize-donation",
  checkAuthentication,
  donationCtrl.initializeDonation
);
router.post(
  "/create-donation",
  checkAuthentication,
  donationCtrl.createDonation
);

module.exports = router;
