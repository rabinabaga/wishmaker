// const UserModel = require("../auth/user.model");
// const GamePlanModel = require("./game_plan.model");
const campaignSvc = require("./campaign.service.js");
const axios = require("axios")

class CampaignController {
  //   gamePlanSvc;
  //   constructor(svc) {
  //     this.gamePlanSvc = svc;
  //   }
  async createCampaign(req, res, next) {
    console.log("req.body", req.body, "req.file", req.file);
    try {
      let new_campaign = await campaignSvc.createCampaign(req);
      console.log("new campaign");
      res.json({
        result: new_campaign,
        message: "new game plan created successfully",
        meta: null,
      });
    } catch (exception) {
      next(exception);
    }
  }
  
  async verfiyPayment(req, res, next) {
    console.log("req.body in verify payment", req.body);
    try {
  
      const headersList = {
        Authorization: `Key test_secret_key_99adeadf717c4f30861b4c27be5c15c0`,
        "Content-Type": "application/json",
      };

      const details = {
        token: req.body.token,
        amount: req.body.amount,
      };
      const bodyContent = JSON.stringify(details);
      console.log("bodyContent:", bodyContent);

      const reqOptions = {
        url: "https://khalti.com/api/v2/payment/verify/",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
     try {
        const response = await axios.request(reqOptions);
        const data = await response;
        // return data;
         res.json({
           result: data.data.amount,
           message: "donated successfully",
           meta: null,
         });
      } catch (error) {
        console.error(
          "Error initializing Khalti payment:",
          error.response ? error.response.data : error.message
        );
        throw error;
      }
    } catch (exception) {
      next(exception);
    }
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

const campaignCtrl = new CampaignController();
module.exports = campaignCtrl;
