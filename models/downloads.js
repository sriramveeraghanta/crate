var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Downloads = new Schema({
	uid : { type: String, required: true},
	filepath: { type: String, required: true },
	datetime: {type: String, required: true},
});

module.exports = mongoose.model('Downloads', Downloads);