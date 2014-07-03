exports.buildModel = function (returnObj, result)
{
	console.dir(result)
    returnObj.view = 'image';

    returnObj.data.msgType = 'image';
    
    returnObj.data.PicUrl = 'image';

    returnObj.data.mediaID = 'echo:'+ result.xml.MediaID;

}