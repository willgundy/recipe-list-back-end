const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5500', 'https://alchemy-shopping-front-end-demo.netlify.app', 'http://localhost:7890'],
  credentials: true,
}));

// App routes
app.use('/api/v1/recipes', require('./controllers/recipe'));
app.use('/api/v1/users', require('./controllers/user'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
