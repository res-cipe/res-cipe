const express = require('express');
const path = require('path');
const app = express();

const passport = require('passport');

// express validator for validation of information sent to backend
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');

// authentication packages
const session = require('express-session');

// routers
const dashRouter = require('./routes/dashRouter');
const userRouter = require('./routes/userRouter');

const PORT = 3000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Validator Middleware
app.use(expressValidator());

// cookieParser middleware
app.use(cookieParser());

// session middleware
app.use(
  session({
    secret: 'ZiDwy4h7kZqzuXx',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true },
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// router for user login
// app.use('/login', userRouter);

// router for user signup
app.use('/signup', userRouter);

app.use('/dashboard', dashRouter);

// Serving index.html
// app.use(express.static(path.join(__dirname, '../index.html')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Default Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Listening on Port 3000
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
