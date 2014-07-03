var fs = require('fs');
var path = require('path');
/////////////////////////////////////////////////////
var config = {};
var configPath = path.join(__dirname, '../config.json');
function setWatch()
{
	fs.watchFile(configPath, function (curr, prev) {
		  console.log('thecurrent mtime is: ' + curr.mtime);
		  readConfig();
	});
}

function readConfig()
{
	config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
}


function init()
{
	setWatch();
	readConfig();
	console.log('Init: Config loaded');
}

init();

exports.config = config;
