var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Files = new Schema({
    filename: {type: String, required: true, unique: false},
	filepath: {type: String, required: true, unique: true},
});

module.exports = mongoose.model('Files', Files);