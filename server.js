var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var routes = require('./app/routes');
var configDB = require('./config/database');
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'qualquercoisaserveaqui', saveUninitialized: true, resave: true}))

app.set('view engine', 'ejs');

routes(app);

app.listen(port);

console.log('Server running on port '+port);