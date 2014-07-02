module.exports.buildModel = function (returnObj, result)
{
    returnObj.page = 'message_text';

    returnObj.data.msgType = 'text';

    returnObj.data.content = 'echo:'+ result.xml.Content;

}