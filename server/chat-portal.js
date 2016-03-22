

exports = module.exports = function (io) {
    var numUsers = 0;
    var socketioJwt = require('socketio-jwt');
    var config  = require('./config');
    
    
    io.set('authorization', socketioJwt.authorize({
        secret: config.secret,
        handshake: true
    }));

    io.sockets.on('connection', function (socket) {
        
        console.log('connected');
        
        console.log('socket.io connection established');
        var addedUser = false;

        // when the client emits 'new message', this listens and executes
        socket.on('SendMessage', function (msg) {
            console.log('noticed new message');
            console.log(msg);
            
            var parsedMsg = JSON.parse(msg);
            socket.emit('MessageReceived', parsedMsg.id); // Send message to sender
            socket.broadcast.emit('NewMessage', msg); // Send message to everyone BUT sender
        });

        // when the client emits 'add user', this listens and executes
        socket.on('AddUser', function (user) {
            if (addedUser) return;
            
            var parsedUser = JSON.parse(user);
            
            // we store the username in the socket session for this client
            
            socket.userid = parsedUser.id;
            socket.username = parsedUser.username;
            ++numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: numUsers
            });
            
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('UserJoined', {
                
                username: socket.username,
                numUsers: numUsers
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('ImTyping', function (user) {
            socket.broadcast.emit('UserTyping', user);
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('IStoppedTyping', function (user) {
            socket.broadcast.emit('UserStoppedTyping', user);
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function () {
            if (addedUser) {
                --numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: numUsers
                });
            }
        });
    });
    console.log('starting chat-portal');
}
