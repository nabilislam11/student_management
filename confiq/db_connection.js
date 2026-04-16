const mongoose = require("mongoose");

let db_connection = async () => {
  await mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("MongoDB connection error:", err.message);
    });
};

module.exports = db_connection;
