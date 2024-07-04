const UserModel = require("../auth/user.model");
const GamePlanModel = require("./game_plan.model");
const gamePlanSvc = require("./game_plan.service.js");

class GamePlanController {
  gamePlanSvc;
  constructor(svc) {
    this.gamePlanSvc = svc;
  }
  async createGamePlan(req, res, next) {
    try {
      let new_game_plan = await gamePlanSvc.createGamePlan(req);
      res.json({
        result: new_game_plan,
        message: "new game plan created successfully",
        meta: null,
      });
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

  async showAllGamePlan(req, res, next) {
    try {
      let search = req.query.search ?? null;

      let limit = 60;
      let currentPage = Number(req.query.page) ?? 3;
      //100, 1=>to 9 index.
      let skip = (currentPage - 1) * limit;

      // console.log(filter);
      let gamePlans = await gamePlanSvc.listAllGamePlans();
      console.log("all game plan");
      res.json({
        result: gamePlans,
        message: "gameplan fetched successfully",
      });
    } catch (exception) {
      next(exception);
    }
  }
}

const gamePlanCtrl = new GamePlanController();
module.exports = gamePlanCtrl;
