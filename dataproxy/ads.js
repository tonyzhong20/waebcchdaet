var request = require('request');
var http = require('http');
var xml2js = require('xml2js');

var configWatcher = require('../watchers/configWatcher');
/////////////////////////////////////////////////////

function get(callback)
{
	var options = {
		  uri: 'http://' + configWatcher.datasourceConfig().apiRoot,
		  jar : true,
		  auth: {
		      'user': configWatcher.datasourceConfig().username,
		      'pass': configWatcher.datasourceConfig().password,
		      'sendImmediately': false
		  }	
	};
	
	request(options,function (error, res, body) {
	      if(res.statusCode == 200){
	    	  console.log('Source data refreshed');
	    	  var parseString = require('xml2js').parseString;
	          parseString(body, {stripPrefix:true,trim: true}, function (err, result) {
	        	  clearXMLJSON(result);
	        	  callback(result['ad:ads']['ad:ad']);
	        	  console.dir(result['ad:ads']['ad:ad'][0]);
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
