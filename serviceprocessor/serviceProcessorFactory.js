exports.make = function (returnObj, result)
{	
	var returnObj = {'data':{}};
	
    var msgType = result.xml.MsgType[0];
    returnObj.data.toUser = result.xml.FromUserName[0];
    returnObj.data.fromUser = result.xml.ToUserName[0];
    returnObj.data.createTime = result.xml.CreateTime[0];
    
    //TODO:catch the error here
    returnObj = require('./'+ msgType).buildModel(returnObj, result);
    
    return returnObj;
}