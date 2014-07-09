exports.buildModel = function (returnObj, result)
{		
	returnObj.view = 'image';

    returnObj.data.msgType = 'image';
    
    returnObj.data.picUrl = result.xml.PicUrl[0];
 
    returnObj.data.mediaID = result.xml.MediaID.PicUrl[0];
}