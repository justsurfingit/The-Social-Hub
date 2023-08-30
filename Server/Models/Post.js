const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  image: {
    publicId: String,
    url: String,
  },
  likes: [
    //LIkes is the array of user who liked this particular post
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  caption: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("post", PostSchema);
