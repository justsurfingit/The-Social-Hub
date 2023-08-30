// const router = require("express").Router();
const { success, error } = require("../Utills/responseWrapper");
const User = require("../Models/User");
const Post = require("../Models/Post");
const allPost = async (req, res) => {
  try {
    const uid = req._id;
    const user = await User.findById(uid);
    const following = user.followings;

    // Find posts from users that the logged-in user is following
    const posts = await Post.find({ owner: { $in: following } });

    res.send(success(200, posts));
  } catch (e) {
    res.send(error(500, "Internal Server Error"));
  }
};

const createPost = async (req, res) => {
  try {
    console.log("the user id we got is ", req._id);
    const uid = req._id;
    console.log("Creating the post...");
    const { caption } = req.body;
    const post = await Post.create({
      owner: uid,
      caption,
    });
    console.log("Post created:", post);

    const user = await User.findById(uid);
    // console.log("User found:", user);

    user.posts.push(post._id);
    await user.save();
    // console.log("User updated with the new post.");

    // console.log("Sending the response...");
    res.send(success(200, post));
  } catch (e) {
    console.error("Error:", e);
    res.send(e);
  }
};
//this worked fine
const likePost = async (req, res) => {
  try {
    const uid = req._id;
    const { postid } = req.body;
    //fetch the user as well as post
    const user = await User.findById(uid);
    const post = await Post.findById(postid);
    if (!user) {
      res.send(error(404, "User not found"));
    }
    if (!post) {
      res.send(error(404, "Post not found"));
    }
    //now we will like the post if it is not like and will unlike in reverse case
    const include = post.likes.includes(uid);
    if (include) {
      const index = post.likes.indexOf(uid);
      post.likes.splice(index, 1);
      await post.save();
      res.send(success("Post Unliked Successfully", post));
    } else {
      post.likes.push(uid);
      await post.save();
      res.send(success("Post Liked Successfully", post));
    }
  } catch (e) {
    console.log(e.message);
    res.send(error(500, "internal server errors"));
  }
};

const myPost = async (req, res) => {
  //first find the user
  const uid = req._id;
  const user = await User.findById(uid);
  if (!user) {
    res.send(error(404, "User not found"));
  }
  const posts = await Post.find({ owner: uid });
  res.send(success(200, posts));
};
module.exports = {
  allPost,
  createPost,
  likePost,
  myPost,
};
