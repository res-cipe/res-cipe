const db = require('../models/userModel');

const userController = {};

userController.newUser = async (req, res, next) => {
  const { username, password, email, firstName, lastName } = req.body;
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req
    .checkBody('username', 'Username must be between 4-15 characters long.')
    .len(4, 15);
  req
    .checkBody('email', 'The email you entered is invalid, please try again.')
    .isEmail();
  req
    .checkBody(
      'email',
      'Email address must be between 4-100 characters long, please try again.'
    )
    .len(4, 100);
  req
    .checkBody('password', 'Password must be between 8-100 characters long.')
    .len(8, 100);
  req
    .checkBody(
      'password',
      'Password must include one lowercase character, one uppercase character, a number, and a special character.'
    )
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/,
      'i'
    );
  req
    .checkBody(
      'passwordMatch',
      'Password must be between 8-100 characters long.'
    )
    .len(8, 100);
  req
    .checkBody('passwordMatch', 'Passwords do not match, please try again.')
    .equals(req.body.password);
  // Additional validation to ensure username is alphanumeric with underscores and dashes
  req
    .checkBody(
      'username',
      'Username can only contain letters, numbers, or underscores.'
    )
    .matches(/^[A-Za-z0-9_-]+$/, 'i');

  const errors = req.validationErrors();

  if (errors) {
    console.log('errors from validation:', errors);
    res.locals.validationErr = errors;
  } else {
    const queryStr =
      'INSERT INTO user_table (username, password, email, first_name, last_name) VALUES ($1, $2, $3, $4, $5)';
    const queryParams = [username, password, email, firstName, lastName];
    try {
      await db.query(queryStr, queryParams);
      return next();
    } catch (error) {
      console.log('error from our db', error);
      return next({
        log: `Database error`,
        status: 502,
        message: { err: `${error.stack}` },
      });
    }
  }
};

module.exports = userController;
