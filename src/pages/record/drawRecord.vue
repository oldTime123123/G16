<template>
	<!-- no-more-text="t('record.r_r1')" :empty -->
	<view style="background: url(/static/actIcon/zhuanpan1/lottery-.png) no-repeat 100%/105%; height: 100vh;">
		<!-- <view :style="store.$state.imgObj.loginBg"> -->
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			<view>
				{{ t('act.d_s7') }}
			</view>
			<view class="center" style="width: 50rpx;height: 50rpx;">

			</view>
		</view>
		<view class="pdlr35 pt33">
			<view style="padding: 0;">
				<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="true"
					:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-full-height="true"
					:auto-show-back-to-top="true" :empty-view-text="t('record.r_r1')"
					:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
					:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')"
					style="margin: 100rpx auto 0;width: 100%;  ">
					<view class="listItem" v-for="(item, index) in recordsList" :key="index">
						<view class="vvItem">
							<view class="f26">{{ t('act.d_s6') }}</view>
							<view class="" :style="{ color: store.$state.contentColor }">
								{{ item.gift ? item.gift.name : '' }}</view>
						</view>
						<view class="vvItem">
							<view class="f26">{{ t('act.d_s6') }}</view>
							<view class="" :style="{ color: store.$state.contentColor }">
								{{ item.createTime }}
							</view>
						</view>
					</view>
				</z-paging>
			</view>
		</view>
	</view>
</template>

<script setup>
import { request } from '../../../comm/request.ts';
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
import {
	getStorageSync
} from '@dcloudio/uni-h5';
const store = userStore();
import {
	useI18n
} from 'vue-i18n'

const {
	t
} = useI18n()
const methods = {
	back() {
		history.back()
	},

};
const recordsList = ref([])
const paging = ref(null)
const pages = ref({
	page: 1,
	size: 10
})
const getData = (page) => {
	pages.value.page = page
	request({
		methods: 'get',
		url: 'activity/lottery/log',
		data: pages.value
	}).then(res => {
		paging.value.complete(res.data);
		pages.value.page += 1
	})
}
const currency = ref("")
// 终于可以用了
onLoad(() => {
	currency.value = uni.getStorageSync('currency')
})
</script>

<style lang="scss"></style>
