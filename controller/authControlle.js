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

    const hash = bcrypt.hashSync(password, 10);

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
let loginController = async (req, res) => {
  let { email, password } = req.body;
  try {
    let existinguser = await User.findOne({ email: email });
    if (existinguser.islogin) {
      return res.status(400).json({
        success: false,
        message: "Please logout from anoder device ",
      });
    }

    res.send(existinguser);

    if (!existinguser) {
      return res.status(400).json({
        success: false,
        message: "This User is not Registered",
      });
    }
    let pass = bcrypt.compareSync(password, existinguser.password); // true
    console.log(pass);
    if (pass) {
      existinguser.islogin = true;
      existinguser.save();
      return res.status(200).json({
        success: true,
        message: "Login Successfull",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "invalid Credential ",
      });
    }
  } catch (error) {}
};
let logoutController = async (req, res) => {
  const { id } = req.body;
  try {
    const user = await User.findById({ _id: id });
    if (user) {
      user.islogin = false;
      user.save();
      res.status(200).json({
        success: true,
        message: "Successfully logout",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Something error in logout",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { authController, loginController, logoutController };
