<template>
	<!-- ew class="kefuItem flex col_center" v-for="item in serviceList" @click="changePage(item)">
					<image :src="item.avatar" mode="widthFix" style="width: 80rpx;height: 80rpx;border-radius: 10rpx;"></image>
					<view class="mglr40 f34"> -->
	<view  style="height: calc(100vh) !important;overflow: hidden;">
	<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{t('all.a_c4')}}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33">
			<view class="mt80">
				<view class="kefuItem flex col_center" v-for="item in serviceList" @click="changePage(item)">
					<image :src="item.avatar" mode="widthFix" style="width: 80rpx;height: 80rpx;border-radius: 10rpx;"></image>
					<view class="mglr40 f34">
						{{item.service_name}} ({{item.start_working_time}} -
							{{item.end_working_time}})
					</view>
				</view>
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
	const serviceList = ref([])
	const getData = () => {
		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {
			// console.log(res);
			res.list ? serviceList.value = res.list : ''
		})
	}
	const changePage = item => {
		window.open(item.contact_link)
	}
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

<style lang="scss">
	.kefuItem {
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		padding:  20rpx;
		color: #000;
	}
</style>
