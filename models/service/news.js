exports.buildModel = function (returnObj, result)
{	
	returnObj.view = 'news';

    returnObj.data.msgType = 'news';
    
    if (result.xml.Content == 'News')
    {
    	returnObj.view = 'news';
    }
    
    returnObj.data.title = '';
    
    returnObj.data.description = '';
    
    returnObj.data.picUrl = result.xml.PicUrl[0];
    
    returnObj.data.url = result.xml.Url[0];
    //returnObj.data.articleCount
    
    //returnObj.data.articles
    
    
}