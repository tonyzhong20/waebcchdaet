var express = require('express');
var util = require('util');
var http = require('http');
var router = express.Router();
///////////////////////////////
var menuModel = require('../models/admin/menu');
var configWatcher = require('../watchers/configWatcher');
var accessTokenWatcher = require('../watchers/accessTokenWatcher');

///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
	var menuJSON = req.body.menujson;
	console.log(menuJSON)
	var options = {
			  hostname: configWatcher.config.apiHostName,
			  path: util.format(configWatcher.config.createMenuURL,accessTokenWatcher.config.accessToken),
			  method: 'POST',
			  port: 80,
			  headers: {
			        'Content-Type': 'application/json',
			        'Content-Length': Buffer.byteLength(menuJSON)
			  }
			};
	console.dir(options);
	var req = http.request(options, function(res) {
		var data = '';
		res.on('data', function(d) {
			data += d;
		}).on('end',function()
		{
			console.dir(data);
			//data = JSON.parse(data);
			
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
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('admin/menu', menuModel.model);
});

module.exports = router;

