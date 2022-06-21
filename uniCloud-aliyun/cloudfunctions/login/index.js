'use strict';
const {appId,appSecret} = require('wx-common');
const db = uniCloud.database();

exports.main = async (event, context) => {
	
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
	let userData = {
		openId,
		nickName: "微信用户111",
		avatarUrl: ""
	}
	
	await db.collection("users").add(userData);
	//返回数据给客户端
	return userData;
};
