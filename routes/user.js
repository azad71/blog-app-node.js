const express = require("express");
const router = express.Router();

// loading middlewares
const auth = require("../middlewares/auth");

// importing user logic
const userControllers = require("../controllers/user");

router.get("/", userControllers.getLandingPage);

router.get("/home", userControllers.getHome);

router.get("/profiles", userControllers.getAllProfile);

router.post(
  "/user/update-password",
  auth.isAuthenticated,
  userControllers.postUpdatePassword
);

router.post(
  "/user/update-profile",
  auth.isAuthenticated,
  userControllers.postUpdateProfile
);

router.post(
  "/user/delete-profile",
  auth.isAuthenticated,
  userControllers.postDeleteUserProfile
);

router.get(
  "/user/profile",
  auth.isAuthenticated,
  userControllers.getUserProfile
);

router.post(
  "/user/update-image",
  auth.isAuthenticated,
  userControllers.postUploadUserImage
);

module.exports = router;
