var fs = require('fs');
var path = require('path');
var https = require('https');
/////////////////////////////////////////////////////

var configPath = path.join(__dirname, '../config.json');
fs.watchFile(configPath, function (curr, prev) {
	  console.log('the current mtime is: ' + curr.mtime);
	  readConfig();
});


function readConfig()
{
	var data = fs.readFileSync(configPath, 'utf8');
	app.set('token',data.token);
	app.set('appID',data.appID);
	app.set('appsecret',data.appsecret);
	app.set('accessToken',data.accessToken);
	var accessTokenGenerateTime = data.accessTokenGenerateTime;
}


function refreshToken(isForce)
{
	if(isForce == true)
	{
		
	}
	
	https.get('https://encrypted.google.com/', function(res) {

	  res.on('data', function(d) {
	    process.stdout.write(d);
	  });

	}).on('error', function(e) {
	  console.error(e);
	});
	
}

exports.readConfig = readConfig;

