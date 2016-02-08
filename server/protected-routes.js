var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config');


var app = module.exports = express.Router();

var jwtCheck = jwt({
  secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/messages', function(req, res) {
  console.log('request to ')
  res.status(200).send('message from protected route!');
});
