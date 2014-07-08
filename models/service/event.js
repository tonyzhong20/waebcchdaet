exports.buildModel = function (returnObj, result)
{
    console.log("Hi. Thanks for following the official account!");
	
	returnObj.view = 'event';

    returnObj.data.msgType = 'event';

    returnObj.data.event = result.xml.Event;

    result.xml.Event = 'Hi. Thanks for following the official account!';
}