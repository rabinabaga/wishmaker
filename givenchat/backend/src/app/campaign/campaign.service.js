const CampaignModel = require("./campaign.model");

class CampaignService {
  async createCampaign(req) {
    console.log("req body in game plan service", req.body);

    let response;
    let status;
    if (req.params.id) {
      // console.log("inside req body with _id");
      status = req.body.status;
      try {
        response = await GamePlanModel.findByIdAndUpdate(
          req.params.id,
          {
            status: status,
            project_id: req.body.project_id,
            title: req.body.title,
            priority: req.body.priority,
          },
          { new: true }
        );
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      let newCampaign;

      console.log("inside req body with _id");

      newCampaign = new CampaignModel({
        campaignTitle: req.body.campaignTitle,
        goalAmount: req.body.goalAmount,
        imageSrc: req.file.filename,
        campaigner_id:req.authUser._id
      });

      try {
        response = await newCampaign.save();
        console.log("response in create campaign service", response);
      } catch (exception) {
        console.log("exception", exception);
        throw exception;
      }
    }

    return response;
  }

  listAllGamePlans = async (filter = {}, paging = { skip: 0, limit: 8 }) => {
    try {
      const game_plans = await GamePlanModel.find(filter);
      console.log("game plans", game_plans);
      return game_plans;
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
