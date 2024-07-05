const CampaignModel = require("./campaign.model");

class CampaignService {
  async createCampaign(req) {
    console.log("req body in game plan service", req.body);

    let response;
    let newCampaign;
    newCampaign = new CampaignModel({
      campaignTitle: req.body.campaignTitle,
      goalAmount: req.body.goalAmount,
      imageSrc: req.file.filename,
      campaigner_id: req.authUser._id,
    });

    try {
      response = await newCampaign.save();
      console.log("response in create campaign service", response);
    } catch (exception) {
      console.log("exception", exception);
      throw exception;
    }

    return response;
  }

  listAllCampaigns = async (filter = {}, paging = { skip: 0, limit: 8 }) => {
    try {
      const campaigns = await CampaignModel.find();
      console.log("game plans", campaigns);
      return campaigns;
    } catch (exception) {
      throw exception;
    }
  };
  deleteGamePlan = async (req) => {
    const filter = { _id: req.params.id };
    try {
      const res = await GamePlanModel.deleteOne(filter);
      console.log("response of delete", res, filter, res.deletedCount);
      return res;
    } catch (exception) {
      throw exception;
    }
  };
}

const campaignSvc = new CampaignService();
module.exports = campaignSvc;
