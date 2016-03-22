var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var multer = require('multer');
const crypto = require('crypto');
var mime = require('mime');
var glob = require("glob");
var path = require('path');


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './cargo/upload')
	},
	filename: function (req, file, cb) {
		console.log(file);
		
		glob('cargo/*', function (err, files) {

			var filepath = 'cargo/'+file.originalname;
			var index = files.indexOf(filepath);
			console.log('index is '+index);
			if (index == -1) {
				cb(null, file.originalname);
			}
			else{
				var filename = file.originalname;
				var myfile = filename.substr(0, filename.lastIndexOf('.'));
				console.log(myfile);
				cb(null,myfile+"_"+ Date.now() + path.extname(file.originalname));
			}
		});
	}
});

var upload = multer({ storage: storage });

router.get('/',function(req,res,next){
	if(req.user){
		var myuser = req.user.username;
		Account.find({username: myuser}, function(err,person){
			res.render('upload',person[0]);
		});
	}
	else{
		res.send('You Are not Logged in');
	}
})

router.post('/', upload.single('file') , function(req,res){
		
	res.send('success');
});


module.exports = router;

