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
  res.render('upload');
})

router.post('/', upload.single('file') , function(req,res){
    console.log(req.file.path)
    res.send('success');
});


module.exports = router;

