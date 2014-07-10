var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var crypto = require('crypto');

var serviceModelFactory = require('../serviceprocessor/serviceProcessorFactory');
var configWatcher = require('../watchers/configWatcher');

function checkSignature (signature, timestamp,nonce)
{
    var tempArr = [];
    tempArr.push(configWatcher.wechatConfig().token);
    tempArr.push(timestamp);
    tempArr.push(nonce);
    tempArr.sort();
    
    var shasum = crypto.createHash('sha1');
    shasum.update(tempArr.join(''));
    
    var tmpStr = shasum.digest('hex');

    if( tmpStr == signature ){
        return true;      
    }else{
        return false;
    }
};



///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
    if (checkSignature(req.query.signature,req.query.timestamp,req.query.nonce))
    {
        var parseString = require('xml2js').parseString;
        parseString(req.body, {trim: true}, function (err, result) {
            var respObj = serviceModelFactory.make(err, result);
            if(respObj != null) {
            	console.log(respObj);
            	res.render('service/' + respObj.view, respObj.data);
            }
            else 
            {
            	console.log("Service not cover:");
            	console.dir(result);
            	res.send("\n");
            }
        });
    }
    else
    {
        res.send("haha!Invalid");
    }
});

/* GET home page. */
router.get('/', function(req, res) {
    var echostr = req.query.echostr;
    var signature = req.query.signature;
    
    
    if (checkSignature(signature,req.query.timestamp,req.query.nonce))
    {
        if (typeof(echostr) == "undefined") 
        {
            res.send("haha!No echostr");
        }else{
            res.send(echostr);
        }
    }
    else
    {
        res.send("haha!Invalid");
    }
});

module.exports = router;

