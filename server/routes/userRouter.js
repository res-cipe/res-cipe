const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/', userController.newUser, (req, res) => {
  res.status(200).json([res.locals]);
});

// router.get();

module.exports = router;
