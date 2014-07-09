exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'text';

    returnObj.data.msgType = 'news';
    
    if (result.xml.Content == 'news')
    {
    	returnObj.view = 'news';
    }
    
    //returnObj.data.articleCount
    
    //returnObj.data.articles
    
    
}