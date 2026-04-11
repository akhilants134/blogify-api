const mongoose = require("mongoose");

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
  }

  await mongoose.connect(process.env.MONGO_URI);

  const db = mongoose.connection.db;
  if (!db) {
    return;
  }

  const usersCollection = db.collection("users");
  const indexes = await usersCollection.indexes();
  const hasUsernameIndex = indexes.some((index) => index.name === "username_1");

  if (hasUsernameIndex) {
    await usersCollection.dropIndex("username_1");
  }
};

module.exports = connectDB;
