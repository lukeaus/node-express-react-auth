const express = require('express');
const http = require('http');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');
const mongoose = require('mongoose');
const cors = require('cors');

// to be able to see data - reach into db and see records with robomongo/Robo 3T

// DB Setup
// create a new database in mongo called auths
mongoose.connect('mongodb://localhost:auth/auth');

// App setup
const app = express();

// middleware
// morgan - logging
app.use(morgan('combined'));
// get around CORS as the front-end and back-end ports different
app.use(cors());
// parse incoming request into json
app.use(bodyparser.json({type: '*/*'}))

router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
