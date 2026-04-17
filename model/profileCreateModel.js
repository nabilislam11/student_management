const mongoose = require("mongoose");
const { Schema } = mongoose;
const profileCreateModel = new Schema({
  employId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "custom"],
    required: true,
  },
});
module.exports = mongoose.model("Profile", profileCreateModel);
