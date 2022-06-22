<template>
	<ezpage :navigationHasBottomLine="false">
		<view slot="contentSection">
			<view @click="updateUserProfile" style="text-align: center;background-color: #fff;padding-bottom: 20px;">
				<image :src="userInfo.avatarUrl" mode="widthFix"
					style="width:100px;height:100px;border-radius: 50px;background-color: #8F8F94;"></image>
				<view>{{userInfo.nickName}}</view>
				<view><text class="dnms-tag" style="background-color: #3aa64e;">同步微信信息</text></view>
			</view>
			<view style="padding: 10px;">
				<view @click="btnCreateBookShelf" class="dnms-blockbutton" style="margin-bottom: 10px;">新建书房</view>
				<view v-for="item in bookshelfs" style="margin-bottom: 10px;">
					<!-- <bookshelfcell @removeHandler="onRemoveHandler" :data="item"></bookshelfcell> -->
				</view>
			</view>
		</view>
	</ezpage>
</template>

<script>
	import ezpage from "../../components/ezpage.vue"
	// import bookshelfcell from "../../components/dnms-ui/bookshelfcell.vue"

	export default {
		components: {
			ezpage,
			// bookshelfcell
		},
		data() {
			return {
				userInfo: null,
				bookshelfs: []
			}
		},
		async onLoad(options) {
			uni.login({
				provider:"weixin",
				success: (res) => {
					var code = res.code;
					uniCloud.callFunction({
						name:"login",
						data:{
							code:code
						},
						success: (res) => {
							console.log(res);
							this.userInfo = res.result;
						}
					})
				}
			})
		},
		onShow() {

		},
		methods: {

		}
	}
</script>

<style>

</style>
