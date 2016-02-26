var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('moderatorregister', { });
});

router.post('/', function(req, res) {
    Account.register(new Account({ 
    	firstname: req.body.firstname,
    	lastname: req.body.lastname,
    	username: req.body.username,
    	isAdmin: false,
    	isModerator: true,
    	isUser: false,
    }), req.body.password, function(err, account) {
        if (err) {
            return res.render('moderatorregister', { error : err , message: err.message});
        }
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

module.exports = router;