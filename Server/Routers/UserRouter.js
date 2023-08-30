const router = require("express").Router();
const {
  FollowandUnfollowUser,
  getAllUsers,
  delUser,
  getMyPost,
  getUserPost,
} = require("../Controllers/UserController");
router.post("/follow", FollowandUnfollowUser);
router.get("/all", getAllUsers);
router.delete("/delete", delUser);
router.get("/getMyPost", getMyPost);
router.get("./getUserPost", getUserPost);
// router.delete("/deleteaccount", DeleteAccount);
module.exports = router;
