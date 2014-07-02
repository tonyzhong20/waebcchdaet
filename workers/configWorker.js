var express = require('express');
var fs = require('fs');

var configPath = '../config.json';
fs.watchFile(configPath, function (curr, prev) {
	  console.log('the current mtime is: ' + curr.mtime);
	  console.log('the previous mtime was: ' + prev.mtime);
});

exports.readConfig = function()
{
	fs.readFile(configPath, {encoding:'utf-8'}, function(err,data)
	{
		console.log(data);
	})
}
