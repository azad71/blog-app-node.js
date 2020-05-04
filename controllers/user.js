// loading models
const Post = require("../models/post");
const User = require("../models/user");

// loading libraries
const bcrypt = require("bcryptjs");
const fs = require("fs");

// loading utilities
const deleteImage = require("../utils/delete-image");

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

exports.getAllProfile = (req, res, next) => {
  res.render("user/profile");
};

exports.getUserProfile = async (req, res, next) => {
  try {
    let user = {
      name: req.user.name,
      email: req.user.email,
      gender: req.user.gender,
      username: req.user.username,
      image: req.user.image,
      createdAt: req.user.createdAt,
    };
    res.render("user/user_profile", { user });
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
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

exports.postUpdateProfile = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const gender = req.body.gender;
    const user_id = req.user._id;
    const current_email = req.user.email;

    // check if user with this email already exists
    const user = await User.findOne({ email: email });

    if (user.email !== current_email) {
      req.flash("warning", "This email is occupied by another user");
      return res.redirect("back");
    }

    await User.findByIdAndUpdate(user_id, { name, gender, email });

    res.redirect("back");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};

exports.postDeleteUserProfile = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};

exports.postUploadUserImage = async (req, res, next) => {
  try {
    let imageUrl;
    const user = await User.findById(req.user._id);
    if (req.file) {
      imageUrl = req.file.filename;
      let previousImage = `images/${req.user.image}`;

      const isImageExist = fs.existsSync(previousImage);
      if (isImageExist) deleteImage(previousImage);
    }

    user.image = imageUrl;
    await user.save();

    res.redirect("back");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};
