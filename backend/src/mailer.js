const nodemailer = require("nodemailer");
const config = require("./config");

function createTransporter() {
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass || !config.smtpFrom) {
    return null;
  }

  return nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpSecure,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  });
}

async function sendOtpEmail({ email, otp, purpose, name }) {
  const transporter = createTransporter();

  if (!transporter) {
    throw new Error(
      "SMTP is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM in backend/.env.",
    );
  }

  const title = purpose === "signup" ? "Complete your VastraAI sign up" : "Your VastraAI login code";
  const greeting = name ? `Hi ${name},` : "Hi,";

  await transporter.sendMail({
    from: config.smtpFrom,
    to: email,
    subject: title,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px; color: #111827;">
        <h2 style="margin: 0 0 16px; color: #6C3BFF;">VastraAI</h2>
        <p style="margin: 0 0 16px;">${greeting}</p>
        <p style="margin: 0 0 16px;">Use the OTP below to continue your ${purpose}.</p>
        <div style="margin: 24px 0; padding: 18px 20px; border-radius: 14px; background: #F3F0FF; text-align: center;">
          <span style="font-size: 30px; letter-spacing: 8px; font-weight: 700; color: #6C3BFF;">${otp}</span>
        </div>
        <p style="margin: 0 0 8px;">This code expires in ${config.otpExpiryMinutes} minutes.</p>
        <p style="margin: 0; color: #6B7280;">If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
}

module.exports = {
  sendOtpEmail,
};
