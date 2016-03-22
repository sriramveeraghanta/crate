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
		console.log('my id is '+req.user.id);
		
		var download = {
			uid: req.user.id,
			filepath: file,
		};

		Download.create( download, function(err){
			if (err) console.log(err);
		});
		//downloads.insert(download);

  		res.download(file);
  	}
  	else{
  		res.send('Please Login to download Files');
  	}
});


module.exports = router;
