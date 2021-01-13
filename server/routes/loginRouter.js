const express = require('express');
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const userController = require('../controllers/userController');


router.post('/', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/'
}));


module.exports = router;