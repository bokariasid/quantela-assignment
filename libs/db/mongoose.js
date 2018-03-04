var mongoose = require('mongoose');

var libs = process.cwd() + '/libs/';

var log = require(libs + 'log')(module);
var config = require(libs + 'config');
mongoose.Promise = global.Promise;
// mongoose.connect(config.get('mongoose:uri'), {useMongoClient:true});
mongoose.connect(config.get('mongoose:uri'), { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function (err) {
	log.error('Connection error:', err.message);
});

db.once('openUri', function callback () {
	log.info("Connected to DB!");
});

module.exports = mongoose;