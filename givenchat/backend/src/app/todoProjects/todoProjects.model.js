const mongoose = require("mongoose");

const TodoProjectsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
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
const TodoProjectsModel = mongoose.model("TodoProjects", TodoProjectsSchema);
module.exports = TodoProjectsModel;
