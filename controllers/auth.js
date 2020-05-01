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
    if (!user) {
      req.flash("error", "No user found with this credentials");
      return res.redirect("back");
    }

    // compare password
    const doPasswordMatch = await brcypt.compare(
      req.body.password,
      user.password
    );

    if (doPasswordMatch) {
      req.session.isLoggedIn = true;
      req.session.user = user;
      await req.session.save();
      return res.redirect("/home");
    }

    req.flash("error", "Invalid password/username");
    res.redirect("back");
  } catch (error) {
    console.log(error.message);
    res.redirect("back");
  }
};

exports.getLogout = async (req, res, next) => {
  await req.session.destroy();
  res.redirect("/");
};

exports.postSignup = async (req, res, next) => {
  try {
    // check if user exists
    const doesUserExist = await User.findOne({ username: req.body.username });
    if (doesUserExist) {
      req.flash("error", "User with this credential already exists");
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
