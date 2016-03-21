
var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser');

// use SET NODE_ENV=development/build in console.
var port = process.env.PORT || 9000;
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

var io = require('socket.io').listen(server);
require('./chat-portal')(io);

server.listen(port);
