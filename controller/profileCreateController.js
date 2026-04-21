const Profile = require("../model/profileModel");
const profileCreateController = async (req, res) => {
  const { email, name, employId, phoneNumber, bloodGroup, dob, gender } =
    req.body;
  try {
    let firstThreeLater = name.slice(0, 3);
    let randomNumber = Date.now().toString().slice(-3);
    let emid = firstThreeLater + randomNumber;
    console.log(emid);

    let profile = await new Profile({
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error ",
    });
  }
};
const getAllProfile = async (req, res) => {
  try {
    const getProfile = await Profile.find({ isHold: { $ne: true } });
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
    if (!existinguser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (existinguser.isHold) {
      return res.status(200).json({
        success: false,
        message: `${existinguser.name} already hold`,
      });
    }
    existinguser.isHold = true;
    await existinguser.save();
    // if (existinguser) {
    //   existinguser.isHold = true;
    //   existinguser.save();
    // }

    res.status(200).json({
      success: true,
      message: `${existinguser.name} is now hold`,
      existinguser: existinguser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error`,
    });
  }
};
const getHoldProfile = async (req, res) => {
  try {
    let data = await Profile.find({ isHold: { $eq: true } });
    res.status(200).json({
      success: true,
      message: `${data.name} holding profile`,
      data: data,
    });
  } catch (error) {
    res.status(200).json({
      success: true,
      message: `Server Error`,
    });
  }
};
module.exports = {
  profileCreateController,
  getAllProfile,
  getSingleProfile,
  updateProfile,
  holdProfile,
  getHoldProfile,
};
