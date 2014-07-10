exports.buildModel = function (returnObj, result)
{
	var content = result.xml.Content[0];
	
	if(content.indexOf("test") > 0)
	{
		returnObj.view = 'richmedia';
		
		var data = returnObj.data;
	    data.msgType = 'news';
	    
	    var latestAds = require('../watchers/sourceDataWatcher').getLatestAds();
	    var length = latestAds.length;
	    data.ArticleCount = length;
	    data.Articles = [];
	    for (var i = 0 ; i < length ; i++) {
	    	var ad = latestAds[i];
	    	console.dir(ad)
	    	
	    	data.Articles.push(
	    		{
	    			Title : ad["ad:title"][0] ,
	    			Description : ad["ad:description"][0]
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