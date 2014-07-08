exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'text';

    returnObj.data.msgType = 'text';
 
    returnObj.data.event = result.xml.Event[0];
    
    if (event == 'subscribe')
    	{
    	returnObj.data.content = 'Thank you for following the official account.';
    	return returnObj;
    	}
    else return null;
}