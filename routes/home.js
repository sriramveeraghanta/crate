var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var multer = require('multer');
const crypto = require('crypto');
var mime = require('mime');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/share')
  },
  filename: function (req, file, cb) {
  	crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });

router.get('/',function(req,res,next){
	res.send('Plz Login to see the content');
})

router.get('/:username',function(req,res,next){
	if(req.user){
		var myuser = req.params.username;
		Account.find({username: myuser}, function(err,person){
		//var json = person[0].user=req.user;
		//console.log(json);
		res.render('home',person[0]);
	});	
	}
	else{
		res.send('You Are not Logged in');
	}
});

router.post('/upload', upload.single('file') , function(req,res){
	console.log('hello');
	console.log(req.body) // form fields
    console.log(req.files) // form files
});


module.exports = router;
