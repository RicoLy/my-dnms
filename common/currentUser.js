const cloudApi = require('./cloudApi')

let userInfo;

const login = () => {
	return new Promise((resolve, reject) => {
		if (isLogin()) {
			resolve(userInfo);
		} else {
			uni.login({
				provider: "weixin",
				success: (res) => {
					cloudApi.call({
						name: "login",
						data: {
							code: res.code
						},
						success: (res) => {
							userInfo = res.result;
							resolve(res.result);
						},
						fail: (err) => {
							reject();
						}
					})
				}
			})
		}
	})
}

const logout = () => {
	userInfo = null;
}

const isLogin = () => {
	return userInfo != null;
}

const getUserInfo = () => {
	return userInfo;
}

const updateUserInfo = (userInfo) => {
	cloudApi.call({
		name:"updateUserProfile",
		data:{
			userInfo:userInfo
		}
	})
}


module.exports = {
	login,
	isLogin,
	getUserInfo,
	updateUserInfo,
	logout
}