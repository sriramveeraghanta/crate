var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var Account = require('../models/account');
var mongoose = require('mongoose');
var Regkeys = require('../models/regkeys');
var Regkey = mongoose.model('Regkeys', Regkeys);

router.get('/',function(req,res,next){
	if(req.isAuthenticated()){
		var myuser = req.user.username;
		var data = {};
		Account.find({username: myuser}, function(err,person){

			data['firstname'] = person[0].firstname;
			data['lastname'] = person[0].lastname;
			data['username'] = person[0].username;
			data['isAdmin'] = person[0].isAdmin;
			data['isModerator'] = person[0].isModerator;
			data['isUser'] = person[0].isUser;

			res.render('regkey',data);
		});
	}
	else{
		res.send('You Are not Logged in');
	}
});

router.post('/', function(req,res,next){
	console.log(req.body.regkey);

	var regkey_data = {
			regkey: req.body.regkey,
			isUsed: false,
	};
	var regkey = new Regkey(regkey_data);
	regkey.save(function(error){
		if(error){
			console.log(error);
		}
	});
	
});

module.exports = router;

