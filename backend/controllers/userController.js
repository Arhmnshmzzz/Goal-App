const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
//Register new user
//route POST /API/users
//access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);
  if (!name || !email || !password) {
    return res.json({ message: "please add all the fileds" });
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    return res.json({ message: "User Exists" });
  }

  //hash Password
  const salt = await bcrypt.genSalt(10);
  const hasedpassword = await bcrypt.hash(password, salt);

  //create users
  const user = await User.create({
    name,
    email,
    password: hasedpassword,
  });

  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.json({ message: "Invalid user data" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check for user mail
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Username or Password");
  }
});

//private
const getMe = asyncHandler(async (req, res) => {
  // const { _id, name, email } = await User.findById(req.user.id);

  res.status(200).json(req.user);
});
// const registerUser = (req, res) => {
//   res.json({ message: "Register User" });
// };

//Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
