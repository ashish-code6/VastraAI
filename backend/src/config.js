const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const config = {
  port: Number(process.env.PORT || 4000),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  otpExpiryMinutes: Number(process.env.OTP_EXPIRY_MINUTES || 10),
  mongodbUri: process.env.MONGODB_URI || "",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: process.env.SMTP_SECURE === "true",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  smtpFrom: process.env.SMTP_FROM || process.env.SMTP_USER || "",
};

module.exports = config;
