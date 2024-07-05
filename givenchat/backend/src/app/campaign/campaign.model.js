const mongoose = require("mongoose");
const UserModel = require("../auth/user.model");


const CampaignSchema = new mongoose.Schema(
  {
    campaignTitle: {
      type: String,
      required: true,
      min: 2,
      max: 200,
    },
    goalAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 2000000,
    },
    imageSrc: {
      type: String,
      required: true,
      min: 2,
      max: 800,
    },
 
    campaigner_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
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
const CampaignModel = mongoose.model("Campaign", CampaignSchema);
module.exports = CampaignModel;
