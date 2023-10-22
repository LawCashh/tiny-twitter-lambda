const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdOn: {
    type: Date,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
