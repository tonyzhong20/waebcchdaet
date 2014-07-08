var express = require('express');
var util = require('util');
var https = require('https');
var router = express.Router();
///////////////////////////////
var menuModel = require('../models/admin/menu');
var configWatcher = require('../watchers/configWatcher');
var accessTokenWatcher = require('../watchers/accessTokenWatcher');

///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
	var menuJSON = req.body.menujson;
	var options = {
			  hostname: configWatcher.config.apiHostName,
			  path: util.format(configWatcher.config.createMenuURL,accessTokenWatcher.config.accessToken),
			  method: 'POST',
			  port: 443,
			  headers: {
			        'Content-Type': 'application/json',
			        'Content-Length': Buffer.byteLength(menuJSON)
			  }
			};

	var req = https.request(options, function(res) {
		var data = '';
		res.on('data', function(d) {
			data += d;
		}).on('end',function()
		{
			data = JSON.parse(data);
			console.log("update menu " + data.errmsg);
			//TODO:Save somewhere!!
//			fs.writeFile(accessTokenPath, JSON.stringify(accessTokenConfig), function(){
//				console.log("Access token refreshed");
//			});
		});
	}).on('error', function(e) {
		console.error("update menu " + e);
	});
	
	req.write(menuJSON + '\n');
	req.end();
	res.send('done');
	console.log("Thanks for joining the account!");
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('admin/menu', menuModel.model);
});

module.exports = router;

