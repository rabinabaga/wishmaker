const router = require("express").Router();
// const GamePlanModel = require('./game_plan.model');

const adminCtrl = require("./donation.controller");
const checkAuthentication = require("../../middlewares/auth.middleware");


router.post(
  "/initialize-donation",
  checkAuthentication,
  donationCtrl.initializeDonation
);

router.get(
  "/payment-callback",
  donationCtrl.handlePayment
);


module.exports = router;
