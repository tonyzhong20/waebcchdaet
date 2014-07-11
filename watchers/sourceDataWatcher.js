var proxyAds = require('../dataproxy/ads');
var config = require('../watchers/configWatcher').datasourceConfig();
/////////////////////////////////////////////////////
var latestAds = null;

function refresh()
{
	//TODO:
	proxyAds.get(function(data){
		latestAds = data;
	},config.api_latestAds);
	
	setTimeout(refresh, 120000);
}


exports.refresh = refresh;
exports.getLatestAds = function()
{
	return latestAds;
}