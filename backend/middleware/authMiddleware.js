const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (req.header.authorization && req.header.authorization.startsWith("Bearer"))
//     try {
//       token = req.headers.authorization.split("")[1];

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       //Get user form the token

//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error("Not Authorized");
//     }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorized, no token");
//   }
// });
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Fix the split method to use space as the separator
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
