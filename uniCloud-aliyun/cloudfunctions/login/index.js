'use strict';
exports.main = async (event, context) => {
	const appId = "wx14f36794f18d7abricoly8";
	const appSecret = "5f48458833f39d014420a43d79f3478cricoly";
	
	//event为客户端上传的参数
	console.log('event : ', event);
	const {code} = event;
	//GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code",
		{
			dataType:"json"
		}
	);
	
	const openId = res.data.openid;
	
	console.log(res.data);
	//返回数据给客户端
	return openId;
};
