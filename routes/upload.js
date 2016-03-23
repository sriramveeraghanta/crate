var express = require('express');
var router = express.Router();
var Account = require('../models/account');
var multer = require('multer');

const crypto = require('crypto');
var mime = require('mime');
var glob = require("glob");
var path = require('path');
var mongoose = require('mongoose');

var UploadSchema = require('../models/uploads');
var MyUpload = mongoose.model('Uploads', UploadSchema);

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './cargo/uploads')
	},
	filename: function (req, file, cb) {
		console.log(file);
		
		glob('cargo/uploads/*', function (err, files) {

			var filepath = 'cargo/uploads/'+file.originalname;
			var index = files.indexOf(filepath);
			console.log('index is '+index);

			if (index == -1) {
				cb(null, file.originalname);

				var upload_data = {
					username: req.user.username,
					filename: file.originalname,
					filepath: filepath,
					datetime: getDatetime(),
				};
				var myupload = new MyUpload(upload_data);
				myupload.save(function(error){
					if(error){
						console.log(error);
					}
				});

			}
			else{
				var filename = file.originalname;
				var myfile = filename.substr(0, filename.lastIndexOf('.'));
				console.log(myfile);
				cb(null,myfile+"_"+ Date.now() + path.extname(file.originalname));

				var myfilename = myfile+"_"+Date.now()+path.extname(file.originalname);

				var upload_data = {
					userid: req.user.id,
					filename: myfilename,
					filepath: filepath,
					datetime: getDatetime(),
				};
				var myupload = new MyUpload(upload_data);
				myupload.save(function(error){
					if(error){
						console.log(error);
					}
				});

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

function getDatetime(){
	var date = new Date();

	var hour = date.getHours();
	hour = (hour < 10 ? "0" : "") + hour;

	var min  = date.getMinutes();
	min = (min < 10 ? "0" : "") + min;
	
	var sec  = date.getSeconds();
	sec = (sec < 10 ? "0" : "") + sec;
	
	var year = date.getFullYear();
	
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;

	var current_datetime = year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

	return current_datetime;
}

module.exports = router;

