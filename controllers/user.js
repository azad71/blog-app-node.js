// loading models
const Post = require("../models/post");
const User = require("../models/user");

// loading libraries
const bcrypt = require("bcryptjs");

exports.getLandingPage = (req, res, next) => {
  res.render("landing");
};

exports.getHome = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.render("user/home", { posts: posts });
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};

exports.getViewProfile = (req, res, next) => {
  res.render("user/profile");
};

exports.postUpdatePassword = async (req, res, next) => {
  try {
    const oldPass = req.body.oldPass;
    const newPass = req.body.newPass;
    const confirmNewPass = req.body.confirmNewPass;

    // check if oldPass and newPass are same
    if (oldPass === newPass) {
      req.flash("warning", "You are entering old password");
      return res.redirect("back");
    }

    // check if newPass and confirmNewPass are same
    if (newPass !== confirmNewPass) {
      req.flash(
        "error",
        "New password doesn't match with confirm new password"
      );
      return res.redirect("back");
    }

    const user = await User.findById(req.user._id);
    const doesPasswordMatch = await bcrypt.compare(oldPass, user.password);

    if (!doesPasswordMatch) {
      req.flash("warning", "Invalid old password");
      return res.redirect("back");
    }

    const hashedPassword = await bcrypt.hash(newPass, 12);
    user.password = hashedPassword;
    await user.save();
    req.flash(
      "warning",
      "Recently you changed the password. Please login to confirm"
    );
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};
