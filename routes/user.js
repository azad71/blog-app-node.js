const express = require("express");
const router = express.Router();

// loading middlewares
const auth = require("../middlewares/auth");

// importing user logic
const userControllers = require("../controllers/user");

router.get("/", userControllers.getLandingPage);

router.get("/home", userControllers.getHome);

router.get("/profile", userControllers.getViewProfile);

router.post(
  "/user/update-password",
  auth.isAuthenticated,
  userControllers.postUpdatePassword
);

module.exports = router;
