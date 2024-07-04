const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    name: {
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
    username: {
      type: String,
      required: true,
      unique: true,
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "regular_user"],
      default: "regular_user",
    },
    address: {
      type: String,
      required: true,
    },
    phone: String,
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
const UserModel = mongoose.model("User", UserSchema)
module.exports = UserModel;