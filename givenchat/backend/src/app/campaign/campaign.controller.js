// const UserModel = require("../auth/user.model");
// const GamePlanModel = require("./game_plan.model");
const campaignSvc = require("./campaign.service.js");
const axios = require("axios");
const request = require("request");

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

  async initializeDonation(req, res, next) {
    console.log("req.body in verify payment", req.body);

    const options = {
      method: "POST",
      url: "https://a.khalti.com/api/v2/epayment/initiate/",
      headers: {
        Authorization: "key live_secret_key_68791341fdd94846a146f0457ff7b455",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        return_url: "http://example.com/",
        website_url: "https://example.com/",
        amount: "1000",
        purchase_order_id: "Order01",
        purchase_order_name: "test",
        customer_info: {
          name: "Ram Bahadur",
          email: "test@khalti.com",
          phone: "9800000001",
        },
      }),
    };
    request(options, function (error, response) {
      if (error) throw new Error(error);
      console.log(response.body, "body");
    });

    // const response = await axios.post(options.url, options.body, {
    //   headers: options.headers,
    // });
    // console.log("response in c", response);
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
