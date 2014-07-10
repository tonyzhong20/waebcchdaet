exports.buildModel = function (returnObj, result)
{
	var content = result.xml.Content;
	
	if(content.indexOf("latest news"))
	{
	
	}
	
	
	
	
	//else 
    returnObj.view = 'text';

    returnObj.data.msgType = 'text';
    //TODO: should tell user tips
    returnObj.data.content = 'You just wrote: '+ content;
    
    return returnObj;
}