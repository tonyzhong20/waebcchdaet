var request = require('request');
var http = require('http');
var xml2js = require('xml2js');

var config = require('../watchers/configWatcher').datasourceConfig();
/////////////////////////////////////////////////////

function get(callback,paramStr)
{
	var uri = 'http://' + config.apiRoot + config.apiAds + (paramStr ? '?'+paramStr:'');
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
	          parseString(body, {stripPrefix:true,trim: true}, function (err, result) {
	        	  clearXMLJSON(result);
	        	  if(callback)
	        	  {
	        		  callback(result['ad:ads']['ad:ad']);
	        	  }
	        	  //console.dir(result['ad:ads']['ad:ad'][0]);
	          });
	      } else {
	          console.log('error: '+ res.statusCode);
	          console.log(body);
	      }
	  });
}

function clearXMLJSON(json)
{
	delete json['ad:ads'].$;
}


exports.get = get;
