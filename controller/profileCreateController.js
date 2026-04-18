const Profile = require("../model/profileCreateModel");
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
module.exports = { profileCreateController, getAllProfile };
