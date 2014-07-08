exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'event';

    returnObj.data.msgType = 'event';
    
    if (result.xml.Event = 'subscribe') {
    	returnObj.data.event = console.log('Hi. Thanks for subscribing!');
    }
    
    //returnObj.data.event = 'Thanks for following the official account!';
    
    //returnObj.data.event = result.xml.Event;
    
    //result.xml.Event = 'Hi. Thanks for following the official account!';
}