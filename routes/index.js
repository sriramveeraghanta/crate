var express = require('express');
var router = express.Router();
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
		res.redirect('/home/'+req.user.username);
	}
	else{
		res.render('index', { user : req.user});
	}
});

module.exports = router;
