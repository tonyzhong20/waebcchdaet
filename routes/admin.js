var express = require('express');
var router = express.Router();
var menuModel = require('../models/admin/menu');
var configWatcher = require('../watchers/configWatcher')
var accessTokenWatcher = require('../watchers/accessTokenWatcher');

///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
	var url = util.format(configWatcher.config.grantAccessTokenURL,
						  accessTokenWatcher.config.appID);
	https.get(url, function(res) {
	
	var data = '';
	res.on('data', function(d) {
	data += d;
	}).on('end',function()
	{
		data = JSON.parse(data);
		accessTokenConfig.accessToken = data.access_token;
		accessTokenConfig.accessTokenExpire = data.expires_in * 1000;
		accessTokenConfig.accessTokenGenerateTime = newtime;
		          
		timeoutObject = setTimeout(refreshToken, accessTokenConfig.accessTokenExpire - 30000);
		
		fs.writeFile(accessTokenPath, JSON.stringify(accessTokenConfig), function(){
			console.log("Access token refreshed");
		});
	
	});
	}).on('error', function(e) {
		console.error("Grant access token error:" + e);
	});
});

/* GET home page. */
router.get('/', function(req, res) {
	res.render('admin/menu', menuModel.model);
});

module.exports = router;

