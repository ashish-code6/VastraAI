const mongoose = require("mongoose");
const config = require("./config");

async function connectDatabase() {
  if (!config.mongodbUri) {
    throw new Error("MONGODB_URI is missing. Add it to backend/.env.");
  }

  await mongoose.connect(config.mongodbUri, {
    serverSelectionTimeoutMS: 10000,
  });
}

module.exports = {
  connectDatabase,
};
