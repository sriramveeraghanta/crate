var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var Regkeys = require('../models/regkeys');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('moderatorregister', { });
});

router.post('/', function(req, res) {

    Regkeys.find({regkey: req.body.regkey}, function(err,regkeys){
        
        if(!regkeys[0].isUsed){
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
                    Regkeys.update({regkey:req.body.regkey}, {isUsed:true}, function(err, doc){
                        res.redirect('/');
                    }); 
                });
            });
        }
        else{
            res.render('moderatorregister', { message: "This Key is expired"});
        }
        
    });
    
});

module.exports = router;