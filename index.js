const mongoose = require("mongoose");

const Post = require("./models/Post");

mongoose.connect(
  "yourmongourlhere",
  { useNewUrlParser: true }
);

exports.handler = async (event) => {
  const post = new Post({
    content: JSON.parse(event.body).content,
    userId: JSON.parse(event.body).id,
    createdOn: new Date().toISOString(),
  });
  savedPost = await post.save();
  if (!savedPost)
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*",
        Accept: "*/*",
      },
      body: JSON.stringify({ message: "nije kreiran tweet" }),
    };
  return {
    statusCode: 201,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
      Accept: "*/*",
    },
    body: JSON.stringify({
      message: "uspjesno kreiran tweet",
      data: savedPost,
    }),
  };
};
