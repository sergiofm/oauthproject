var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);

var routes = require('./app/routes');
var configDB = require('./config/database');
mongoose.connect(configDB.url);

require('./config/passport')(passport);


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
	secret: 'qualquercoisaserveaqui', 
	saveUninitialized: true, 
	resave: true,
	store: new MongoStore({
		mongooseConnection: mongoose.connection,
		ttl: 2 * 24 * 60 * 60
	})}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next){
	console.log(req.session);
	console.log('=============================');
	console.log(req.user);
	next();
});

app.set('view engine', 'ejs');

routes(app, passport);

app.listen(port);

console.log('Server running on port '+port);