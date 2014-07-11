var request = require('request');
var http = require('http');
var xml2js = require('xml2js');

var config = require('../watchers/configWatcher').datasourceConfig();
/////////////////////////////////////////////////////

function get(callback,params)
{
	var uri = 'http://' + config.apiRoot + params;
	var options = {
		  uri: uri,
		  jar : true,
		  auth: {
		      'user': config.username,
		      'pass': config.password,
		      'sendImmediately': false
		  }	
	};
	
	request(options,function (error, res, body) {
	      if(res.statusCode == 200){
	    	  console.log('Source data refreshed');
	    	  var parseString = require('xml2js').parseString;
	          parseString(body, {trim: true, async:true}, function (err, result) {
	        	  var adArr = convertJSON(result['ad:ads']['ad:ad']);
        		  callback(adArr);
	          });
	      } else {
	          console.log('error: '+ res.statusCode);
	          console.log(body);
	      }
	  });
}

function convertJSON(adArr)
{
	var returnAds = [];
	var length = adArr.length;
	for (var i = 0 ; i < length ; i++) {
		var returnAd = {};
		returnAds.push(returnAd);
		var ad = adArr[i];
		
		returnAd.title = ad["ad:title"][0];
		
		var picsNode = ad["pic:pictures"][0]["pic:picture"];
    	if(picsNode)
    	{
    		var picLinks = picsNode[0]["pic:link"];
    		//console.log(picsNode)
    		for(var j = 0; j < picLinks.length ; j++)
			{
    			var piclink = picLinks[j]['$'];
    			if(piclink['rel'] == "normal")
    			{
    				returnAd.pic = piclink['href'];
    				break;
    			}
			}
    	}
    	else
    	{
    		returnAd.pic = '';
    	}
    	

		var linkNodes = ad["ad:link"];
		for(j = 0; j < linkNodes.length ; j++)
		{
			var link = linkNodes[j]['$'];
			if(link['rel'] == "self-public-website")
			{
				returnAd.url = link['href'];
				break;
			}
		}
	}

	return returnAds;
}


exports.get = get;
