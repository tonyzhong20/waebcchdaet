exports.buildModel = function (returnObj, result)
{	
	console.log(returnObj);
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