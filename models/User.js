const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: "src/assets/images/placeholder.png",
  },
  description: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
