const express = require('express');
const router = express.Router();

// import auth controllers
const authControllers = require('../controllers/auth');

router.get('/auth/login', authControllers.getLogin);

router.post('/auth/login', authControllers.postLogin);

router.get('/auth/logout', authControllers.getLogout);

router.post('/auth/signup', authControllers.postSignup);


module.exports = router;