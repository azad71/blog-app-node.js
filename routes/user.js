const express = require('express');
const router = express.Router();

// importing user logic
const userControllers = require('../controllers/user');

router.get('/', userControllers.getLandingPage);

router.get('/home', userControllers.getHome);

router.get('/profile', userControllers.getViewProfile);

module.exports = router;