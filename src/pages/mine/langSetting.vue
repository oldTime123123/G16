<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{t('all.a_c3')}}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33">
			<view class="mt80 pb50">
				<view class="kefuItem flex col_center" v-for="(item,index) in langList" @click="setHandle(index)"
					:style="langInd == index?choStyle:''">
					<image :src="item.link"  style="width: 100rpx; height: 60rpx;">
					</image>
					<view class="mglr40 f40">
						{{item.name}}
					</view>
				</view>

				<!-- 	<view class="btns f40" :style="{background:store.$state.contentColor}" >
					{{t('all.a_c1')}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script setup>
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
	const methods = {
		back() {
			history.back()
		},

	};
	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff'
	}
	const langList = ref([])
	const langInd = ref(0)
	const getData = () => {

		request({
			url: 'setting/lang',
			methods: 'get',
		}).then(res => {
			let langVal = uni.getStorageSync('lang')
			langList.value = res
			langList.value.forEach((item, index) => {
				if (langVal == item.lang) {
					langInd.value = index
				}
			})
		})
	}
	const setHandle = (index) => {
		uni.setStorageSync('lang', langList.value[index].lang)
		history.go(0)

		// window.open(item.contact_link)
	}
	// 终于可以用了
	onShow(() => {

		getData();
	})
</script>

<style lang="scss">
	.kefuItem {
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 40rpx;
		padding: 15rpx 20rpx;
		transition: .3s linear all;
		color: #000;
	}
body{
	background: #FFF9F3;
}
	
</style>