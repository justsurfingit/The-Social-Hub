const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { error } = require("../Utills/responseWrapper");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    // return res.status(401).send("Authorization header is required");
    return res.send(error(401, "Authorization header is required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];
  // console.log(accessToken);

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_KEY);
    //user id is placed in the req through this middleware
    req._id = decoded._id;
    // console.log("verify ", decoded);
    const user = await User.findById(req._id);
    if (!user) {
      return res.send(error(404, "User not found"));
    }

    next();
  } catch (e) {
    // console.log(e);
    // return res.status(401).send("Invalid access key");
    return res.send(error(401, "Invalid access key"));
  }
};
