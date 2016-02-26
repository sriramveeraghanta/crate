var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    firstname: {type: String, required: true, unique: false},
	lastname: {type: String, required: true, unique: false},
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	isAdmin: {type: Boolean, required: true, unique: false},
	isModerator: {type: Boolean, required: true, unique: false},
	isUser: {type: Boolean, required: true, unique: false},
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);