var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('adminregister', { });
});

router.post('/', function(req, res) {
    if (req.body.regkey == 'crate12345') {
        Account.register(new Account({ 
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        isAdmin: true,
        isModerator: false,
        isUser: false,
        }), req.body.password, function(err, account) {
            if (err) {
                return res.render('adminregister', { error : err , message: err.message});
            }
            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    }
    else{
        res.render('adminregister', {message: "Incorrect Registration Key"});
    }
    
});

module.exports = router;