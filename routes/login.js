var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');

router.get('/', function(req, res, next) {
    res.render('login', { user : req.user });
});

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
    	return res.render('login', { message : 'Username or Password is incorrect' } );
    }
    req.login(user, function(err){
      if(err){
        return next(err);
      }
      return res.redirect('/home/'+user.username);
    });
  })(req, res, next);
});

module.exports = router;
