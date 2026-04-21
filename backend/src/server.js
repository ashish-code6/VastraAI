const crypto = require("crypto");
const express = require("express");
const cors = require("cors");

const config = require("./config");
const { connectDatabase } = require("./db");
const { sendOtpEmail } = require("./mailer");
const User = require("./models/User");
const OtpRequest = require("./models/OtpRequest");

const app = express();

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
  }),
);
app.use(express.json());

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function generateOtp() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function createSessionToken() {
  return crypto.randomBytes(24).toString("hex");
}

async function storeOtp({ email, otp, purpose, payload }) {
  await OtpRequest.findOneAndDelete({ email });
  await OtpRequest.create({
    email,
    otp,
    purpose,
    payload,
    expiresAt: new Date(Date.now() + config.otpExpiryMinutes * 60 * 1000),
  });
}

async function validateOtpRecord(email, otp, purpose) {
  const record = await OtpRequest.findOne({ email });

  if (!record) {
    return { valid: false, message: "OTP not found. Please request a new one." };
  }

  if (record.purpose !== purpose) {
    return { valid: false, message: "OTP purpose mismatch. Please request a new code." };
  }

  if (record.expiresAt.getTime() < Date.now()) {
    await OtpRequest.deleteOne({ _id: record._id });
    return { valid: false, message: "OTP expired. Please request a new one." };
  }

  if (record.otp !== otp) {
    return { valid: false, message: "Invalid OTP. Please try again." };
  }

  return { valid: true, record };
}

function sendError(res, status, message) {
  res.status(status).json({ success: false, message });
}

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "VastraAI auth server is running." });
});

app.post("/auth/signup/send-otp", async (req, res) => {
  const name = String(req.body.name || "").trim();
  const email = normalizeEmail(req.body.email);

  if (!name || !email) {
    return sendError(res, 400, "Name and email are required.");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return sendError(res, 409, "An account with this email already exists.");
  }

  const otp = generateOtp();
  await storeOtp({
    email,
    otp,
    purpose: "signup",
    payload: { name },
  });

  try {
    await sendOtpEmail({ email, otp, purpose: "signup", name });
    return res.json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Signup OTP email failed:", error);
    return sendError(res, 500, error.message || "Unable to send OTP email.");
  }
});

app.post("/auth/signup/verify-otp", async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const otp = String(req.body.otp || "").trim();

  if (!email || !otp) {
    return sendError(res, 400, "Email and OTP are required.");
  }

  const validation = await validateOtpRecord(email, otp, "signup");

  if (!validation.valid) {
    return sendError(res, 400, validation.message);
  }

  const user = await User.create({
    name: validation.record.payload.name,
    email,
  });

  await OtpRequest.deleteOne({ _id: validation.record._id });

  return res.json({
    success: true,
    message: "Signup successful.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: createSessionToken(),
  });
});

app.post("/auth/login/send-otp", async (req, res) => {
  const email = normalizeEmail(req.body.email);

  if (!email) {
    return sendError(res, 400, "Email is required.");
  }

  const user = await User.findOne({ email });

  if (!user) {
    return sendError(res, 404, "No account found with this email.");
  }

  const otp = generateOtp();
  await storeOtp({
    email,
    otp,
    purpose: "login",
    payload: { name: user.name },
  });

  try {
    await sendOtpEmail({ email, otp, purpose: "login", name: user.name });
    return res.json({
      success: true,
      message: "OTP sent to your email.",
    });
  } catch (error) {
    console.error("Login OTP email failed:", error);
    return sendError(res, 500, error.message || "Unable to send OTP email.");
  }
});

app.post("/auth/login/verify-otp", async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const otp = String(req.body.otp || "").trim();

  if (!email || !otp) {
    return sendError(res, 400, "Email and OTP are required.");
  }

  const validation = await validateOtpRecord(email, otp, "login");

  if (!validation.valid) {
    return sendError(res, 400, validation.message);
  }

  const user = await User.findOne({ email });

  if (!user) {
    await OtpRequest.deleteOne({ _id: validation.record._id });
    return sendError(res, 404, "Account no longer exists.");
  }

  await OtpRequest.deleteOne({ _id: validation.record._id });

  return res.json({
    success: true,
    message: "Login successful.",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token: createSessionToken(),
  });
});

connectDatabase()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`VastraAI auth server running on http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
