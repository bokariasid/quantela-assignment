var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// db.os_details.find
var OsDetails = new Schema({
	username: { type: String, required: true },
	os: { type: String, required: true },
	processors: { type: Number, required: true, min:1},
	modified: { type: Date, default: Date.now },
	created_at: { type: Date, default: Date.now },
	networkStatus:{ type: Boolean, required:true},
	ramTotal: { type: String, required: true, min:1},
	ramFree: { type: String, required: true, min:1},
	loadAverage: { type: [Number], required:true}
});

module.exports = mongoose.model('os_details', OsDetails);