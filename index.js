require("dotenv").config();
const express = require("express");

const authController = require("./controller/authControlle");
const db_connection = require("./confiq/db_connection");

const app = express();

app.use(express.json());

// DB connect
db_connection();

// Route
app.post("/registration", authController);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
