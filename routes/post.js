const express = require('express');
const router = express.Router();

// importing logics
const postControllers = require('../controllers/post');

router.get('/create-new-post', postControllers.getCreatePost);

router.post('/create-new-post', postControllers.postCreatePost);

router.get('/post/view/:post_id', postControllers.getPost);

router.get('/post/update/:post_id', postControllers.getUpdatePost);

router.post('/post/update/:post_id', postControllers.postUpdatePost);

router.post('/post/delete/:post_id', postControllers.postDeletePost);

module.exports = router;