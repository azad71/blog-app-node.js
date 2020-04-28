// loading models
const User = require("../models/user");

// load libraries
const brcypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login");
};

exports.postLogin = async (req, res, next) => {
  try {
    // find user by username
    const user = await User.findOne({ username: req.body.username });

    // compare password
    const doPasswordMatch = await brcypt.compare(
      req.body.password,
      user.password
    );

    if (doPasswordMatch) {
      return res.redirect("/home");
    }
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};

exports.getLogout = (req, res, next) => {
  res.redirect("/");
};

exports.postSignup = async (req, res, next) => {
  try {
    // check if user exists
    const doesUserExist = await User.findOne({ username: req.body.username });
    if (doesUserExist) {
      console.log("User with this credential already exists.");
      return res.redirect("back");
    }

    // hash password
    const hashedPassword = await brcypt.hash(req.body.password, 12);

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
    });

    const newUser = await user.save();
    console.log(newUser);
    res.redirect("/home");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};
