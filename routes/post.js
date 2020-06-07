const express = require("express");
const router = express.Router();

// importing logics
const postControllers = require("../controllers/post");

// loading middleware
const auth = require("../middlewares/auth");

/*
@access: Private
@desc: get user to Create Post form
*/
router.get(
  "/create-new-post",
  auth.isAuthenticated,
  postControllers.getCreatePost
);

router.post(
  "/create-new-post",
  auth.isAuthenticated,
  postControllers.postCreatePost
);

router.get("/post/view/:post_id", postControllers.getPost);

router.get(
  "/post/update/:post_id",
  auth.isAuthenticated,
  auth.checkPostOwnership,
  postControllers.getUpdatePost
);

router.post(
  "/post/update/:post_id",
  auth.isAuthenticated,
  auth.checkPostOwnership,
  postControllers.postUpdatePost
);

router.post(
  "/post/delete/:post_id",
  auth.isAuthenticated,
  auth.checkPostOwnership,
  postControllers.postDeletePost
);

module.exports = router;
