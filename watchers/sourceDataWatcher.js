var proxyAds = require('../dataproxy/ads');
/////////////////////////////////////////////////////
var latestAds = null;

function refresh()
{
	//TODO:
	proxyAds.get(function(data){
		latestAds = data;
	});
	
	setTimeout(refresh, 120000);
}


exports.refresh = refresh;
