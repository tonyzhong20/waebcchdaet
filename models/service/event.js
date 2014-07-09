exports.buildModel = function (returnObj, result)
{	
	returnObj.data.event = result.xml.Event[0];
	console.log(returnObj.data.event);
    if (returnObj.data.event == 'subscribe')
    {

    	returnObj.view = 'text';

    	returnObj.data.msgType = 'text';
    	returnObj.data.content = 'Thank you for following the official account.';
    	
    	return returnObj;
	}
    else return null;
}