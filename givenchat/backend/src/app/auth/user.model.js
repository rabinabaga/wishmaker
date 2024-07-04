const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "regular_user"],
      default: "regular_user",
    },
    country: {
      type: String,
      required: true,
    },

    password: String,
    status: {
      type: String,
      enum: ["inactive", "active", "other"],
      default: "inactive",
    },

    token: String,
    forgetToken: String,
    validateTill: Date,
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
    // collection: "authUsers"
  }
);

// users => authusers
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
