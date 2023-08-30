const User = require("../Models/User");
const bcrypt = require("bcrypt");
// const dotenv=require('dotenv');
// const { setitem, KEY_ACCESS } =require( "../../client/src/Utils/localStorage");
const jwt = require("jsonwebtoken");
const { success, error } = require("../Utills/responseWrapper");
const signupController = async (req, res) => {
  try {
    const { password, email, username } = req.body;
    // If the password or email is missing
    // console.log("stuff gotten are ");
    // console.log(password);
    // console.log(email);
    // console.log(username);
    if (!password || !email || !username)
      return res.send(error(400, "All Fields must be provided"));

    // If email is already registered with a user
    const old = await User.findOne({ email });
    if (old)
      return res.send(
        error(409, "Email is already registered with another user")
      );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    //password:hasdhedPassword is important
    const user = new User({
      email,
      password: hashedPassword,
      username,
    });
    const savedUser = await user.save();
    res.send(success(200, savedUser));
  } catch (err) {
    console.log(err);
    res.send(error(500, "Internal Server Error"));
  }
};

//let's make login controller
const generateRefreshToken = (data) => {
  try {
    const refreshToken = jwt.sign(data, process.env.REFRESH_KEY, {
      expiresIn: "1y",
    });
    return refreshToken;
  } catch (err) {
    console.log(err);
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      // return res.status(400).send("All fields are required");
      return res.send(error(400, "All fields are required"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // return res.status(404).send("User is not registered");
      return res.send(error(404, "User is not registered"));
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      // return res.status(403).send("Incorrect password");
      return res.send(error(403, "Incorrect password"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });
    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    // console.log('this is it');
    return res.send(success(200, { accessToken }));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

//refersh token validation and generation of new action token
const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies || !cookies.jwt) {
    return res.send(error(500, "Invalid Refresh Token"));
  }
  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });
    res.send(success(200, accessToken));
  } catch (err) {
    console.error(err);
    res.send(error(401, "Invalid refresh token"));
  }
};

//token play a very important role  in the keeping the user logged in
const generateAccessToken = (data) => {
  const token = jwt.sign(data, process.env.ACCESS_KEY, {
    expiresIn: "1d",
  });

  // Store the access token in the local storage
  // localStorage.setItem("ACCESS_KEY", token);

  return token;
};

module.exports = {
  LoginController,
  signupController,
  generateAccessToken,
  refreshAccessToken,
};
