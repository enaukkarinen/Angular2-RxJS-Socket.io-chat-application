
var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser');

// use SET NODE_ENV=development/build in console.
var port = process.env.PORT || 7203;
var environment = process.env.NODE_ENV;

var app = express();

// log all requests to the console
app.use(logger('dev'));

app.use(express.static('./dist/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));
app.use(require('./user-routes'));


console.log('About to crank up node!');
console.log('PORT=' + port);

// Serve index.html for all routes to leave routing up to Angular
app.all('/*', function(req, res) {
  res.sendFile('index.html', {root:'dist'});
});

// Start webserver if not already running
var server = http.createServer(app);
server.on('error', function(err) {
    
    if(err.code === 'EADDRINUSE'){
    console.log('server is already started at port ' + port);
    }
    else {
    throw err;
    }
    
});

var io =  require('socket.io')(server);
// Chatroom

var numUsers = 0;

io.on('connection', function (socket) {
    console.log('socket.io connection established');
var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
      console.log('noticed new message');
      console.log(data);
      
    // we tell the client to execute 'new message'
    socket.emit('message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
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

server.listen(port);

