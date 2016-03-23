var express = require('express');
var router = express.Router();

var Account = require('../models/account');
var Uploads = require('../models/uploads');

router.get('/',function(req,res,next){
	if(req.isAuthenticated()){
		var myuser = req.user.username;
		var data = {};
		Account.find({username: myuser}, function(err,person){
			
			Uploads.find({},function(err,uploads){
				data['firstname'] = person[0].firstname;
				data['lastname'] = person[0].lastname;
				data['username'] = person[0].username;
				data['isAdmin'] = person[0].isAdmin;
				data['isModerator'] = person[0].isModerator;
				data['isUser'] = person[0].isUser;
				data['uploadsinfo'] = uploads;

				console.log(data);

				res.render('uploadslist',data);
			});

		});
	}
	else{
		res.send('You Are not Logged in');
	}
});

module.exports = router;

