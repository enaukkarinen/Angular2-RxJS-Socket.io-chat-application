var express = require('express');

var app = module.exports = express.Router();

app.get('/api/messages', function(req, res) {
  res.status(200).send(messages);
});

var messages = [
    {
        message: 'Wow! This application is shitty.',
        username: 'Joe Eames',
        datetime: new Date("October 13, 2015 11:13:00").toISOString(),
        avatar: 'avatar'
    },
    {
        message: 'What is this?',
        username: 'Charles Max Wood',
        datetime: new Date("January 13, 2016 11:13:00").toISOString(),
        avatar: 'avatar'
    },
    {
        message: 'asdfsdgadfas',
        username: 'Gregg Pollack',
        datetime: new Date("February 2, 2016 11:13:00").toISOString(),
        avatar: 'avatar'
    },
    {
        message: 'What\'s a MessageBox?',
        username: 'John Papa',
        datetime: new Date("February 13, 2016 11:13:00").toISOString(),
        avatar: 'avatar'
    },
    {
        message: 'Who uses webpack nowadays?..',
        username: 'Dan Wahlin',
        datetime: new Date("February 22, 2016 11:13:00").toISOString(),
        avatar: 'avatar'
    }
];

// more routes for our API will happen here
app.get('/api/avatar/:hash', function (req, res, next) {
    var file = req.params.hash + '.png';
    var options = {
        root: __dirname + '/avatars/',
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