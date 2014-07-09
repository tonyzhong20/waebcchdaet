exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'news';

    returnObj.data.msgType = 'news';
    
    if (result.xml.Content == 'News')
    {
    	returnObj.view = 'news';
    	console.log('testing');
    }
    
    //returnObj.data.articleCount
    
    //returnObj.data.articles
    
    
}