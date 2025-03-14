const mongoose = require("mongoose");
//database lưu mã otp và email sẽ bị mất sau 60s
const forgotPasswordSchema = new mongoose.Schema(
  {
    email: String,
    otp: String,
    expireAt: {
      type: Date,
      expires: 60,
    },
  },
  {
    timestamps: true,
  }
);
const ForgotPassword = mongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;