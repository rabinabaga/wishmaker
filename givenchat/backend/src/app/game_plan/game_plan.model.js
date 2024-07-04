const mongoose = require("mongoose");
const UserModel = require("../auth/user.model");
const TodoProjectModel = require("../todoProjects/todoProjects.model")

const GamePlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    status: {
      type: String,
      required: true,
      enum: ["NEW", "PENDING", "IN PROGRESS", "COMPLETED"],
      default: "NEW",
    },
    priority: {
      type: String,
      required: true,
      enum: ["High", "Medium", "Low"],
      default: "Low",
    },
    project_id: {
      type: mongoose.Types.ObjectId,
      ref: "TodoProjects",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
    // collection: "authUsers"
  }
);

// users => authusers
const GamePlanModel = mongoose.model("GamePlan", GamePlanSchema);
module.exports = GamePlanModel;
