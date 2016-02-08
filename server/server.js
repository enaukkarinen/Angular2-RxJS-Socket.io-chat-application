var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    bodyParser      = require('body-parser');

var app = express();

console.log('starting server');


// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(err, req, res, next) {
  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

app.use(logger('dev'));
app.use(errorhandler())

app.use(require('./anonymous-routes'));
app.use(require('./protected-routes'));
app.use(require('./user-routes'));

var port = 3001;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

