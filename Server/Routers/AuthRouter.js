//THis is our main router for our application
const router = require("express").Router();
const {
  LoginController,
  signupController,
  refreshAccessToken,
} = require("../Controllers/authController");

router.post("/signup", signupController);
router.post("/login", LoginController);
router.get("/refresh", refreshAccessToken);

module.exports = router;
//this is default export
