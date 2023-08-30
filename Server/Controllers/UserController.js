const Post = require("../Models/Post");
const User = require("../Models/User");
const { success, error } = require("../Utills/responseWrapper");
const FollowandUnfollowUser = async (req, res) => {
  try {
    const uid = req._id;
    // console.log(uid);
    const usertofollowid = req.body.userid;
    //so okay
    //let's get the requiesting user
    const user_req = await User.findById(uid);
    const user_follow = await User.findById(usertofollowid);
    if (uid == usertofollowid) {
      res.send(error(409, "User cannot follow themself"));
      return;
    }
    if (!user_follow) {
      res.send(error(404, "User not found"));
      return;
    }
    //now we have to check whether this user already follows this use or not

    const includes = user_req.followings.includes(usertofollowid);
    if (!includes) {
      //then this user doesn't follow him so directly follow and add to followers and following
      user_follow.followers.push(uid);
      user_req.followings.push(usertofollowid);
      //we also have to save both the user
      await user_follow.save();
      await user_req.save();
      res.send(success(200, "User followed Successfully"));
    } else {
      //remove the user from the following
      // remove from both followers and followings
      const index = user_req.followings.indexOf(usertofollowid);
      const findex = user_follow.followers.indexOf(uid);
      user_follow.followers.splice(findex, 1);
      user_req.followings.splice(index, 1);
      user_req.save();
      user_follow.save();
      res.send(success(200, "User Unfollowed Successfully"));
    }
  } catch (e) {
    console.log(e);
  }
};
const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});

    // Send the list of users as the response
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send(error(500, "Server Error"));
  }
};
const delUser = async (req, res) => {
  try {
    const uid = req._id;

    const user = await User.findById(uid);

    if (!user) {
      return res.status(404).send(error(404, "User not found."));
    }

    // Delete posts created by the user
    await Post.deleteMany({ owner: uid });

    // Update followers and followings
    const followers = user.followers;
    const followings = user.followings;

    await User.updateMany(
      { _id: { $in: followers } },
      { $pull: { followings: uid } }
    );

    await User.updateMany(
      { _id: { $in: followings } },
      { $pull: { followers: uid } }
    );

    // Remove likes from posts
    const posts = await Post.find({ likes: uid });
    for (const post of posts) {
      const index = post.likes.indexOf(uid);
      if (index !== -1) {
        post.likes.splice(index, 1);
        await post.save(); // Save the updated post
      }
    }

    // Remove user's likes from all posts
    await Post.updateMany({ likes: uid }, { $pull: { likes: uid } });
    //we have to delete all the post also

    await Post.deleteMany({ owner: uid });

    // Delete the user
    await User.findByIdAndDelete(uid);
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    res
      .status(200)
      .send(success(200, "Your account has been successfully deleted"));
  } catch (e) {
    console.log(e.message);
    res.status(500).send(error(500, "Internal Server Error"));
  }
};
//For fetching the post of the cur user
const getMyPost = async () => {
  try {
    const uid = req._id;
    const allPost = await Post.find({
      owner: uid,
    }).populates("likes");
    res.send(success(200, { allPost }));
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};
//
const getUserPost = async () => {
  try {
    const uid = req.body.userId;
    if (!uid) {
      res.send(error(400, "UserId is required"));
    }
    const allUserPost = await Post.find({
      owner: uid,
    }).populates("likes");
    res.send(success(200, { allUserPost }));
  } catch (e) {
    console.log(e);
    res.send(error(500, e.message));
  }
};

module.exports = {
  FollowandUnfollowUser,
  getAllUsers,
  delUser,
  getMyPost,
  getUserPost,
};
