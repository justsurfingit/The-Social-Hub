const router = require("express").Router();

const {
  allPost,
  createPost,
  likePost,
  myPost,
} = require("../Controllers/PostController");
//this is post router
router.get("/all", allPost);
router.post("/", createPost);
router.post("/like", likePost);
router.get("/mypost", myPost);

module.exports = router;
