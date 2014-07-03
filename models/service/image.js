exports.buildModel = function (returnObj, result)
{
	console.dir(result);
	
    returnObj.view = 'image';

    returnObj.data.msgType = 'image';
    
    returnObj.data.picUrl = 'echo:' + result.xml.PicUrl[0];

    returnObj.data.mediaID = 'echo:'+ result.xml.MediaID[0];
    
    console.log(result);
}