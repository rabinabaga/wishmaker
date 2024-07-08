// const UserModel = require("../auth/user.model");
// const GamePlanModel = require("./game_plan.model");
const donationSvc = require("./donation.service.js");
const axios = require("axios");
const request = require("request");

class DonationController {
  //   gamePlanSvc;
  //   constructor(svc) {
  //     this.gamePlanSvc = svc;
  //   }
  async createDonation(req, res, next) {
    console.log("req.body", req.body, "req.file", req.file);
    try {
      let newDonation = await donationSvc.createDonation(req);
      console.log("new campaign");
      res.json({
        result: newDonation,
        message: "new donation made successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async initializeDonation(req, res, next) {
    console.log("req.body in initialize donation", req.body);
    let response = await donationSvc.createDonation(req);

    const data = {
      result: response,
      meta: null,
      msg: "donation initialized",
    };
    res.json(data);
  }

  async handlePayment(req, res, next) {
    console.log("req.body in initialize donation", req.body);
    // Extract query parameters from the request
    const response = await donationSvc.handlePayment(req);
    console.log("response in handle data", response);
    const data = {
      result: { donationData: response },
      meta: null,
      msg: "donation" + response.status,
    };
    res.redirect("http://localhost:3000/home");
  }
  async deleteGamePlan(req, res, next) {
    try {
      let result = await gamePlanSvc.deleteGamePlan(req);
      res.json({
        // result: { numberOfDeletedDocuments: result.deletedCount },
        result: { numberOfDeletedDocuments: result.deletedCount },

        message: "delete succesful",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }

  async getAllCampaigns(req, res, next) {
    try {
      let search = req.query.search ?? null;

      let limit = 60;
      let currentPage = Number(req.query.page) ?? 3;
      //100, 1=>to 9 index.
      let skip = (currentPage - 1) * limit;

      // console.log(filter);
      let campaigns = await campaignSvc.listAllCampaigns();
      console.log("all game plan");
      res.json({
        result: campaigns,
        message: "campaigns fetched successfully",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const donationCtrl = new DonationController();
module.exports = donationCtrl;
