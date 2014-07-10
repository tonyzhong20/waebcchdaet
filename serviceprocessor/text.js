exports.buildModel = function (returnObj, result)
{
	var content = result.xml.Content;
	
	if(content.indexOf("test"))
	{
		returnObj.view = 'richmedia';
		
		var data = returnObj.data;
	    data.msgType = 'news';
	    
	    var latestAds = require('../watchers/sourceDataWatcher').getLatestAds();
	    data.ArticleCount = latestAds.length;
	    data.Articles = [];
	    for (ad in latestAds) {
	    	data.Articles.push(
	    		{
	    			Title : ad["ad:title"] ,
	    			Description : ad["ad:description"]
	    			//PicUrl : ad["pic:pictures"][0] ,
	    			//Url : ad["ad:title"] ,
	    		}
	    	);
	    }
	    console.dir(data);
	    return returnObj;
	}
	
	
	
	
	//else 
    returnObj.view = 'text';

    returnObj.data.msgType = 'text';
    //TODO: should tell user tips
    returnObj.data.content = 'You just wrote: '+ content;
    
    return returnObj;
}