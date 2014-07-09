exports.buildModel = function (returnObj, result)
{	
	var event = result.xml.Event[0];
	
    if (event == 'subscribe')
    {

    	returnObj.view = 'text';

    	returnObj.data.msgType = 'text';
    	returnObj.data.content = 'Thank you for following the official account.';
    	
    	return returnObj;
	}
    else 
	{
    	return null;
	}
}