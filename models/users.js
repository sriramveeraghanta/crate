var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Users = new Schema({
	firstname: String,
	lastname: String,
	username: String,
	password: String,
	isAdmin: Boolean,
	isModerator: Boolean,
	isUser: Boolean,
});

Users.plugin(passportLocalMongoose);
module.exports = mongoose.model('Users', Users)