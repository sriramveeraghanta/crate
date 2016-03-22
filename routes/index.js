var express = require('express');
var router = express.Router();
var Account = require('../models/account');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
		res.redirect('/cargo/');
	}
	else{
		res.render('index', { user : req.user});
	}
});

module.exports = router;
