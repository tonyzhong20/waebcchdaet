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
    
    returnObj.data.picUrl = result.xml.PicUrl;
    
    returnObj.data.url = result.xml.Url;
    
    //returnObj.data.articleCount
    
    //returnObj.data.articles
    
    
}