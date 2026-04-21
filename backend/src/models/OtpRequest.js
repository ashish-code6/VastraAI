const mongoose = require("mongoose");

const otpRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["signup", "login"],
      required: true,
    },
    payload: {
      type: Object,
      default: {},
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  },
);

module.exports =
  mongoose.models.OtpRequest || mongoose.model("OtpRequest", otpRequestSchema);
