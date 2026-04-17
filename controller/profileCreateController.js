const Profile = require("../model/profileCreateModel");
const profileCreateController = (req, res) => {
  const { email, name, employId, phoneNumber, bloodGroup, dob, gender } =
    req.body;
  let firstThreeLater = name.slice(0, 3);
  let randomNumber = Date.now().toString().slice(-3);
  let emid = randomNumber;

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
module.exports = profileCreateController;
