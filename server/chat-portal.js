var express = require('express');
var app = module.exports = express.Router();
var http = require('http').Server(app);
var io = require('socket.io');

io(http, {
        log: false,
        agent: false,
        origins: '*:*'
});

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        console.log(msg);
        io.emit('chat message', msg);
    });
});

console.log('starting chat-portal');