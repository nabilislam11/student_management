const bcrypt = require("bcryptjs");
const User = require("../model/userSChema");

let authController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existinguser = await User.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        success: false,
        message: "This email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    let createuser = new User({
      username,
      email,
      password: hash,
    });

    console.log(createuser, "successfully done");

    await createuser.save();

    res.status(201).json({
      id: createuser._id,
      username: createuser.username,
      email: createuser.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = authController;
