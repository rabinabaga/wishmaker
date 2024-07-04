const GamePlanModel = require("./game_plan.model");

class GamePlanService {
  async createGamePlan(req) {
    console.log("req body in game plan service", req.body);

    let response;
    let status;
    if (req.params.id) {
      // console.log("inside req body with _id");
      status = req.body.status;
      try {
        response = await GamePlanModel.findByIdAndUpdate(
         req.params.id ,
          {
            status: status,
            project_id: req.body.project_id,
            title: req.body.title,
            priority:req.body.priority
          },
          { new: true }
        );
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      let new_game_plan;
      status = "new";
      console.log("inside req body with _id");
      if (req.body.parent_game_plan) {
        const gamePlanFromDb = await GamePlanModel.findOne({
          _id: req.body.parent_game_plan,
        });
        new_game_plan = new GamePlanModel({
          title: req.body.title,
          project_id: req.body.project_id,
          status: status,
          priority: req.body.priority,
        });
      } else {
        new_game_plan = new GamePlanModel({
          title: req.body.title,
          project_id: req.body.project_id,
          status: status,
          priority: req.body.priority
        });
      }

      try {
        response = await new_game_plan.save();
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
    const filter = { _id: req.params.id }
    try {
      const res = await GamePlanModel.deleteOne(filter)
      console.log("response of delete", res, filter, res.deletedCount);
      return res;
    } catch (exception) {
      throw exception;
    }
  };
}


const gamePlanSvc = new GamePlanService();
module.exports = gamePlanSvc;
