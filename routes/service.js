var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var crypto = require('crypto')
var configWatcher = require('../watchers/configWatcher');

function checkSignature (signature, timestamp,nonce)
{
    var tempArr = [];
    tempArr.push(configWatcher.config.token);
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

function responseMsg(err, result)
{
    var returnObj = {'data':{}};

    returnObj.data.toUser = result.xml.FromUserName[0];
    returnObj.data.fromUser = result.xml.ToUserName[0];
    returnObj.data.createTime = result.xml.CreateTime[0];
    returnObj.data.msgType = result.xml.MsgType[0];
    //TODO:catch the error here
    returnObj = require('../models/service/'+result.xml.MsgType[0]).buildModel(returnObj, result);
    if(returnObj != null) {
    	returnObj.view = 'service/' + returnObj.view;
    }
    return returnObj;
};


///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
    if (checkSignature(req.query.signature,req.query.timestamp,req.query.nonce))
    {
        var parseString = require('xml2js').parseString;
        parseString(req.body, {trim: true}, function (err, result) {
            var respObj = responseMsg(err, result);
            if(respObj != null) {
            	console.log(respObj);
            	res.render(respObj.view, respObj.data);
            }
            else res.send("\n");
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

