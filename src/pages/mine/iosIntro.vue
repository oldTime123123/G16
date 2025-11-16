<template>


	<view :style="store.$state.imgObj.loginBg">
<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="back"></image>
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33">
<!-- 
			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="back"></image>
			</view> -->
			<view class="content_box ">
				<view class="item f45 text_bold" v-for="(item,index) in dataList" :key="index">
					<view class="mb10">
						{{index+1}}.
					</view>
					<image :src="item" style="width: 100%;height: 50vh;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	// import topNav from "@/components/topNav/topNav.vue"
	import {request} from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	// import {
	// 	Toast
	// } from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();

	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const dataList = [
		"/static/downLoad/1.png",
		"/static/downLoad/2.png",
		"/static/downLoad/3.png",
		"/static/downLoad/4.png",
	]
	const back = ()=>{
		history.back()
	}
	// 终于可以用了
	onShow(() => {})
</script>

<style lang="scss">
	.content_box {
		padding: 31rpx 35rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.item {
		width: 48%;
		margin-bottom: 20rpx;
	}
</style>
