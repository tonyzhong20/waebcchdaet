var fs = require('fs');
var path = require('path');
var https = require('https');
var util = require('util');
var configWatcher = require('./configWatcher');
/////////////////////////////////////////////////////
var accessTokenConfig = {};
var accessTokenPath = path.join(__dirname, '../accessToken.json');

var timeoutObject;
function refreshToken(isForce)
{
	console.log("check access token");
	
	if(timeoutObject) clearTimeout(timeoutObject);
	
	var newtime = ((new Date()).getTime());

	if(isForce == true || 
	  typeof(accessTokenConfig.accessTokenGenerateTime) == 'undefined' || 
	  (newtime - accessTokenConfig.accessTokenGenerateTime) > 
	  (accessTokenConfig.accessTokenExpire - 60000))
	{
	    
		var url = util.format(configWatcher.wechatConfig().grantAccessTokenURL,
							  configWatcher.wechatConfig().appID,
							  configWatcher.wechatConfig().appsecret);
		url = configWatcher.wechatConfig().apiHostName + url;
		https.get(url, function(res) {
			//TODO: should check Json
			if(res.headers['content-type'].indexOf("html") > 0)
			{
				console.log("Access token refresh failed");
				return;
			}
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
			console.error("Get access token " + e);
		});
		
	}
	else
	{
	    var timeout = accessTokenConfig.accessTokenExpire + accessTokenConfig.accessTokenGenerateTime - newtime - 30000;
		timeoutObject = setTimeout(refreshToken,timeout);
	}
	
	
}

function init()
{
	accessTokenConfig = JSON.parse(fs.readFileSync(accessTokenPath, 'utf8'));
	refreshToken();
	console.log('Init: Access token inited');
}

init();

exports.refreshToken = refreshToken;
exports.config = function(){ return accessTokenConfig;};
