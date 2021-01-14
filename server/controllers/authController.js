const db = require('../models/userModel');
const session = require('express-session');

const authController ={};


authController.verifyUser = (req, res, next) => {

  try {
    if(req.session.passport.user && req.session.passport.user == req.params.id) {
      next();
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next({
      log: `authController.verifyUser: ERROR: ${error}`,
      message: { error: 'An internal error occured :( ' },
    })
  }

};

module.exports = authController;