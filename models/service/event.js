exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'event';

    returnObj.data.msgType = 'event';

    returnObj.data.event = 'Thanks for following the official account!';
    
    //returnObj.data.event = result.xml.Event;

    //result.xml.Event = 'Hi. Thanks for following the official account!';
}