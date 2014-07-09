exports.buildModel = function (returnObj, result)
{
    returnObj.view = 'text';

    returnObj.data.msgType = 'text';
    
    returnObj.data.content = 'You just wrote: '+ result.xml.Content;
    
    return returnObj;
}