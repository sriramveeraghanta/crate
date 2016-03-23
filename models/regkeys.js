var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Regkeys = new Schema({
	regkey : { type: String, required: true},
	isUsed : { type: Boolean, required: true},
});

module.exports = mongoose.model('Regkeys', Regkeys);