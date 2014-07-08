exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'event';

    returnObj.data.msgType = 'event';
 
    returnObj.data.event = result.xml.Event[0];
    
    if (returnObj.data.event = 'subscribe') {
    	console.log('Thanks for subscribing!');
    }
    else console.log('Please subscribe!');
    
    //result.xml.Event[0] = 'Hi. Thanks for following the official account!';
}