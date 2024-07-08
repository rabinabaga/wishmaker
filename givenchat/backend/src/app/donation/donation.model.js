const mongoose = require("mongoose");
const UserModel = require("../auth/user.model");
const CampaignModel = require("../campaign/campaign.model");

const DonationSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    donationAmount: {
      type: Number,
      required: true,
      min: 2,
      max: 2000000,
    },
    pidx: {
      type: String,
      min: 2,
      max: 2000,
    },
    donorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
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
const DonationModel = mongoose.model("Donation", DonationSchema);
module.exports = DonationModel;
