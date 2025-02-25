const mongoose = require("mongoose");
const  generateHelpers  = require("../helpers/generate");

const accountSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generateHelpers.generateRandomString(20),
    },
    phone: String,
    avatar: {
      type: String,
      default:"",
    },
    role_id: String,
    status: String,
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const Account = mongoose.model("Account", accountSchema, "Account");

module.exports = Account;