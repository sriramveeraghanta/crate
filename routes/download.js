var glob = require("glob");
var path = require('path');
var mime = require('mime');
var mongoose = require('mongoose');

var Downloads = require('../models/downloads');
var Download = mongoose.model('Downloads', Downloads);

var express = require('express');
var router = express.Router();

router.get('/:file(*)',function(req,res,next){
	if(req.isAuthenticated()){
		var file = req.params.file;

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
		
		var download_data = {
			uid: req.user.id,
			filepath: file,
			datetime: current_datetime,
		};


		var download = new Download(download_data);


		download.save(function(error){
			if(error){
				console.log(error);
			}
		});
		res.download(file);
	}
	else{
		res.send('Please Login to download Files');
	}
});


module.exports = router;
