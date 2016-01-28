// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var port = 3002;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3002/api)
router.get('/', function (req, res, next) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.get('/image/:hash', function (req, res, next) {
    var file = req.params.hash + '.png';
    var options = {
        root: __dirname + '/assets/',
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile(file, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', file);
        }
    });
});

router.get('/messages', function(req, res, next) {
  res.send(messages);
});



var messages = [
    {
        message: 'Wow! This application is shitty.',
        username: 'Joe Eames',
        datetime: new Date().toLocaleString(),
        imageHash: 'avatar'
    },
    {
        message: 'What is this?',
        username: 'Charles Max Wood',
        datetime: new Date().toLocaleString(),
        imageHash: 'avatar'
    },
    {
        message: 'asdfsdgadfas',
        username: 'Gregg Pollack',
        datetime: new Date().toLocaleString(),
        imageHash: 'avatar'
    },
    {
        message: 'What\'s a MessageBox?',
        username: 'John Papa',
        datetime: new Date().toLocaleString(),
        imageHash: 'avatar'
    },
    {
        message: 'Who uses webpack nowadays?..',
        username: 'Dan Wahlin',
        datetime: new Date().toLocaleString(),
        imageHash: 'avatar'
    }
];

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);