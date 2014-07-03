exports.buildModel = function (returnObj, result)
{	
    console.dir(result);
	
	returnObj.view = 'image';

    returnObj.data.msgType = 'image';
    
    returnObj.data.picUrl = result.xml.PicUrl[0];
 
    returnObj.data.mediaID = result.xml.MediaID[0];
    
    console.dir(result);
}