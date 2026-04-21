const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    avatarUrl: {
      type: String,
      default: "",
      trim: true,
    },
    preferences: {
      type: [String],
      default: ["Casual", "Minimal", "Neutral Colors"],
    },
    stats: {
      looksGenerated: {
        type: Number,
        default: 0,
      },
      looksSaved: {
        type: Number,
        default: 0,
      },
      styleQuizzes: {
        type: Number,
        default: 1,
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
