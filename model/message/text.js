exports.buildModel = function (returnObj, result)
{
    returnObj.page = 'text';

    returnObj.data.msgType = 'text';

    returnObj.data.content = 'echo:'+ result.xml.Content;

}