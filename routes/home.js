var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.get('/',function(req,res,next){
	res.send('Plz Login to see the content');
})

router.get('/:username',function(req,res,next){
	if(req.user){
		var myuser = req.params.username;
		Account.find({username: myuser}, function(err,person){
			res.render('home',person[0]);
		});	
	}
	else{
		res.send('You Are not Logged in');
	}
});


module.exports = router;
