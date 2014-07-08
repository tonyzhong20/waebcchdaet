exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'event';

    returnObj.data.msgType = 'text';
 
    returnObj.data.event = result.xml.Event[0];
     
    returnObj.data.content = 'Thanks for subscribing!'+ result.xml.Content;
    
    //result.xml.Event[0] = 'Hi. Thanks for following the official account!';
}