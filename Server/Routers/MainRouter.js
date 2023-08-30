//THis is our main router for our application
const router = require("express").Router();
const AuthRouter = require("./AuthRouter");
const PostRouter = require("./PostRouter");
const userCheck = require("../Middlewares/requireUser");
const UserRouter = require("./UserRouter");
//connecting the main router to the auth router
router.get("/", (req, res) => {
  res.json({ message: "Welcome to our API" });
});
router.use("/auth", AuthRouter);
//userCheck middleware is passed to check of iser os logged in or not
router.use("/post", userCheck, PostRouter);
router.use("/user", userCheck, UserRouter);

module.exports = router;
//this is default export
