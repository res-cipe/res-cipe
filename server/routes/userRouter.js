const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/userController');

router.post('/', userController.newUser, (req, res) => {
  // res.status(200).json([res.locals]);
  console.log('this is req.user', req.user);
  console.log('this is req.Authenticated', req.isAuthenticated());
  res.redirect('/');
});

// router.get();

module.exports = router;
