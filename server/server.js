const express = require('express');
const path = require('path');
const app = express();
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const dashRouter = require('./routes/dashRouter');
const userRouter = require('./routes/userRouter');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Validator Middleware
app.use(expressValidator());

// Serving index.html
// app.use(express.static(path.join(__dirname, '../index.html')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// router for user login
// app.use('/login', userRouter);

// router for user signup
app.use('/signup', userRouter);

app.use('/dashboard', dashRouter);

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
