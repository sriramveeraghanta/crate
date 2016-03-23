var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var compression = require('compression');

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var register = require('./routes/register');
var userregister = require('./routes/userregister');
var moderatorregister = require('./routes/moderatorregister');
var login = require('./routes/login');
var logout = require('./routes/logout');
var cargo = require('./routes/cargo');
var upload = require('./routes/upload');
var download = require('./routes/download');
var admin = require('./routes/admin');
var adminregister = require('./routes/adminregister');
var uploadslist = require('./routes/uploadslist');
var downloadslist = require('./routes/downloadslist');
var regkey = require('./routes/regkey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//templates engine
//app.set('templates', path.join(__dirname,'templates'));
//app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cargo', express.static('cargo'));

app.use(require('express-session')({
  secret: 'hello nodejs app',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(compression()); //use compression 

//routers
app.use('/', routes);
app.use('/users', users);
app.use('/register',register);
app.use('/userregister',userregister);
app.use('/moderatorregister',moderatorregister)
app.use('/login',login);
app.use('/logout',logout);
app.use('/cargo',cargo);
app.use('/upload',upload);
app.use('/download',download);
app.use('/admin',admin);
app.use('/adminregister',adminregister);
app.use('/uploadslist',uploadslist);
app.use('/downloadslist',downloadslist);
app.use('/regkey',regkey);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/crate');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	  message: err.message,
	  error: err
	});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
	message: err.message,
	error: {}
  });
});


module.exports = app;
