var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var OsDetails = require(libs + 'model/os_details');


// Dummy object to be considered for formatting.
// {
// 	username:'os.userInfo().username',
// 	os:os.platform(),
// 	processors:os.cpus().length,
// 	ramTotal:int,
// 	ramFree:int,
// 	loadAverage:int,
// 	cache:int,
// 	networkStatus:bool,
// }
//
// {
// 	username:'os.userInfo().username',
// 	os:os.platform(),
// 	processors:os.cpus().length,
// 	ramTotal:os.totalmem(),
// 	ramFree:os.freemem(),
// 	loadAverage:os.loadavg(),
// 	networkStatus:bool,
// }

router.get('/', function(req, res) {

	OsDetails.find(function (err, osDetails) {
		if (!err) {
			return res.json(osDetails);
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			return res.json({
				error: 'Server error'
			});
		}
	});
});

// router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {
router.post('/', function(req, res) {

	var request_json = req.body;
	var os_detail = new OsDetails(request_json);
	os_detail.save(function (err) {
		if (!err) {
			log.info("New detail created with id: %s", os_detail.id);
			return res.json({
				status: 'OK',
				os_detail:os_detail
			});
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({
					error: 'Validation error'
				});
			} else {
				res.statusCode = 500;
				res.json({
					error: 'Server error'
				});
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
});

router.get('/:id', function(req, res) {

	OsDetails.findById(req.params.id, function (err, os_detail) {

		if(!os_detail) {
			res.statusCode = 404;

			return res.json({
				error: 'Not found'
			});
		}

		if (!err) {
			return res.json({
				status: 'OK',
				os_detail:os_detail
			});
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);

			return res.json({
				error: 'Server error'
			});
		}
	});
});

// if needed to update the details about the os data instance.

// router.put('/:id', function (req, res){
// 	var id = req.params.id;

// 	OsDetails.findById(id, function (err, os_detail) {
// 		if(!os_detail) {
// 			res.statusCode = 404;
// 			log.error('Article with id: %s Not Found', id);
// 			return res.json({
// 				error: 'Not found'
// 			});
// 		}
// 		var requestJson = req.body;
		// async.eachOf(requestJson, function(value, key, cbEachOf) {
		// 	os_detail[key] = value;
		// 	cbEachOf();
		// }, function(err){
		// 	if(err){
		// 		res.statusCode = 500;
		// 		return res.json({
		// 			error: 'Server error'
		// 		});
		// 	}
		// });

// 		os_detail.save(function (err) {
// 			if (!err) {
// 				log.info("Article with id: %s updated", os_detail.id);
// 				return res.json({
// 					status: 'OK',
// 					os_detail:os_detail
// 				});
// 			} else {
// 				if(err.name === 'ValidationError') {
// 					res.statusCode = 400;
// 					return res.json({
// 						error: 'Validation error'
// 					});
// 				} else {
// 					res.statusCode = 500;

// 					return res.json({
// 						error: 'Server error'
// 					});
// 				}
// 				log.error('Internal error (%d): %s', res.statusCode, err.message);
// 			}
// 		});
// 	});
// });

module.exports = router;