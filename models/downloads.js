var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Downloads = new Schema({
	uid : { type: Number, required: true},
	filepath: { type: String, required: true },
});

module.exports = mongoose.model('Downloads', Downloads);