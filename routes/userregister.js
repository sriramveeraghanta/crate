var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('userregister', { });
});

router.post('/', function(req, res) {
    Account.register(new Account({ 
    	firstname: req.body.firstname,
    	lastname: req.body.lastname,
    	username: req.body.username,
    	isAdmin: false,
    	isModerator: false,
    	isUser: true,
    }), req.body.password, function(err, account) {
        if (err) {
            return res.render('userregister', { error : err , message: err.message});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

module.exports = router;