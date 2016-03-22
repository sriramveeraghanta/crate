var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/', function(req, res, next) {
	if(req.isAuthenticated()){
        res.redirect('/');
    }
    else{
        res.render('admin', { });
    }
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
	if (err) {
		return next(err); // will generate a 500 error
	}
	// Generate a JSON response reflecting authentication status
	//console.log(user.isAdmin);
	if (! user) {
		return res.render('admin', { message : 'Username or Password is incorrect' } );
	}

	if(user.isAdmin){
	  req.login(user, function(err){
		if(err){
		  return next(err);
		}
		return res.redirect('/cargo/');
	  });
	}
	else{
	  return res.render('admin', { message : 'You are not an Admin' } );
	}
	
  })(req, res, next);
});

module.exports = router;
