exports.buildModel = function (returnObj, result)
{
    returnObj.view = 'text';

    returnObj.data.msgType = 'text';

    returnObj.data.content = 'echo:'+ result.xml.Content;

}