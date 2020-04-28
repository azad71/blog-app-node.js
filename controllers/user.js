const Post = require("../models/post");

exports.getLandingPage = (req, res, next) => {
  res.render("landing");
};

exports.getHome = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render("user/home", { posts: posts });
  } catch (error) {
    console.log(error);
  }
};

exports.getViewProfile = (req, res, next) => {
  res.render("user/profile");
};
