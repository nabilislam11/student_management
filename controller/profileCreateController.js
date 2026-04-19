const Profile = require("../model/profileModel");
const profileCreateController = (req, res) => {
  const { email, name, employId, phoneNumber, bloodGroup, dob, gender } =
    req.body;
  let firstThreeLater = name.slice(0, 3);
  let randomNumber = Date.now().toString().slice(-3);
  let emid = firstThreeLater + randomNumber;
  console.log(emid);

  let profile = new Profile({
    email,
    employId: emid,
    name,
    phoneNumber,
    bloodGroup,
    gender,
    dob,
  });
  profile.save();
  res.status(201).json({ success: true, message: "Profile create" });
};
const getAllProfile = async (req, res) => {
  try {
    const getProfile = await Profile.find({});
    res.status(200).json({
      success: true,
      message: "All Product",
      getProfile: getProfile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error ",
    });
  }
};
const getSingleProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Profile.findOne({ _id: id });
    res.status(200).json({
      success: true,
      message: `${data.name} Profile`,
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error`,
    });
  }
};
const updateProfile = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Profile.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: `${data.name} Profile`,
      data: data,
    });
  } catch (error) {
    es.status(500).json({
      success: false,
      message: `Server error`,
    });
  }
};
const holdProfile = async (req, res) => {
  const { id } = req.body;
  try {
    const existinguser = await Profile.findOne({ _id: id });
    // if (existinguser) {
    //   existinguser.isHold = true;
    //   existinguser.save();
    // }
    existinguser.isHold = true;
    existinguser.save();
    res.status(200).json({
      success: true,
      message: `${existinguser.name} HoldProfile`,
      existinguser: existinguser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error`,
    });
  }
};
module.exports = {
  profileCreateController,
  getAllProfile,
  getSingleProfile,
  updateProfile,
  holdProfile,
};
