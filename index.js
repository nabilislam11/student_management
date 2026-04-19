require("dotenv").config();
const express = require("express");

const db_connection = require("./confiq/db_connection");
const {
  authController,
  loginController,
  logoutController,
} = require("./controller/authControlle");
const {
  getAllProfile,
  profileCreateController,
  getSingleProfile,
} = require("./controller/profileCreateController");

const app = express();

app.use(express.json());

// DB connect
db_connection();

// Route
app.post("/registration", authController);
app.post("/login", loginController);
app.delete("/logout", logoutController);
app.post("/profile", profileCreateController);
app.get("/getAllProfile", getAllProfile);
app.get("/getSingleProfile/:id", getSingleProfile);
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
