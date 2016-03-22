var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Uploads = new Schema({
	userid: {type: String, required: true},
    filename: {type: String, required: true},
	filepath: {type: String, required: true},
	datetime: {type: String, required: true},
});

module.exports = mongoose.model('Uploads', Uploads);