var glob = require("glob");
var path = require('path');

var express = require('express');
var router = express.Router();
var Account = require('../models/account');

router.get('/',function(req,res,next){
	if(req.isAuthenticated()){
		var myuser = req.user.username;
		var data = {};
		Account.find({username: myuser}, function(err,person){
			
			glob('cargo/*', function (err, files) {
				data['firstname'] = person[0].firstname;
				data['lastname'] = person[0].lastname;
				data['username'] = person[0].username;
				data['isAdmin'] = person[0].isAdmin;
				data['isModerator'] = person[0].isModerator;
				data['isUser'] = person[0].isUser;
				data['files'] = files;
				data['filesinfo'] = [];
				data['urlPath'] = 'cargo';
				data['dirs'] = ['cargo'];

				for (var i = 0; i< files.length ; i++) {
					var filesinfo = {
					filePath : files[i],
					fileName : path.basename(files[i]),
					fileExt : path.extname(files[i]),
					}
					data.filesinfo.push(filesinfo);
				}
  				//console.log(data);
  				res.render('cargo',data);
			});
		});	
	}
	else{
		res.send('You Are not Logged in');
	}
});

router.get('/:path(*)',function(req,res,next){
	if(req.isAuthenticated()){
		var folderpath = req.params.path;
		var myuser = req.user.username;
		var urlPath = 'cargo/'+folderpath;
		var dirs = urlPath.split(path.sep);
		dirs.splice(-1,1);
		var data = {};
		Account.find({username: myuser}, function(err,person){
			
			glob('cargo/'+folderpath+'/*', function (err, files) {
				
				data['firstname'] = person[0].firstname;
				data['lastname'] = person[0].lastname;
				data['username'] = person[0].username;
				data['isAdmin'] = person[0].isAdmin;
				data['isModerator'] = person[0].isModerator;
				data['isUser'] = person[0].isUser;
				data['files'] = files;
				data['filesinfo'] = [];
				data['urlPath'] = urlPath;
				data['dirs'] = dirs;

				for (var i = 0; i< files.length ; i++) {
					var filesinfo = {
					filePath : files[i],
					fileName : path.basename(files[i]),
					fileExt : path.extname(files[i]),
					}
					data.filesinfo.push(filesinfo);
				}
  				//console.log(data);
  				res.render('cargo',data);
			});
		});	
	}
	else{
		res.send('You Are not Logged in');
	}
});

module.exports = router;
