const express = require('express');
const path = require('path');
const app = express();
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const PORT = 3000;
const dashRouter = require('./routes/dashRouter');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Validator Middleware
app.use(expressValidator());

// Serving index.html
app.use(express.static(path.join(__dirname, '../index.html')))

// route for dashboard 
app.use('/dashboard', dashRouter)

// Error handler
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


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});