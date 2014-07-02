var express = require('express');
var router = express.Router();
var xml2js = require('xml2js');
var messageHelper = require('../helper/message')

///////////////////////////////
/* POST home page. */
router.post('/', function(req, res) {
    if (messageHelper.checkSignature(req.query.signature,req.query.timestamp,req.query.nonce))
    {
        var parseString = require('xml2js').parseString;
        parseString(req.body, {trim: true}, function (err, result) {
            var respObj = messageHelper.responseMsg(err, result);
            res.render(respObj.page, respObj.model);
        });
    }
    else
    {
        res.send("haha!Invalid");
    }
  //res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res) {
    var echostr = req.query.echostr;
    var signature = req.query.signature;
    
    
    if (messageHelper.checkSignature(signature,req.query.timestamp,req.query.nonce))
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
  //res.render('index', { title: 'Express' });
});

module.exports = router;
