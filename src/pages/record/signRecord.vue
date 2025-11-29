<template>
	<!-- fresher-enabled="false" :to-bottom-loading-more-enabled="true" -->
	<view style="background: url('/static/actIcon/sign/signBg-.png') no-repeat 100%; min-height: 100vh;">
		<!-- <view :style="store.$state.imgObj.loginBg"> -->
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			<view>
				Sign Record
			</view>
			<view class="center" style="width: 50rpx;height: 50rpx;">

			</view>
		</view>
		<view class="pdlr35 pt33">
			<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="true"
				:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-full-height="true"
				:auto-show-back-to-top="true" :empty-view-text="t('record.r_r1')"
				:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')"
				style="margin: 100rpx auto 0;width: 100%;  ">

				<view v-for="(item, index) in recordsList" :key="index">
					<view class="listItem" v-if="item.bonus > 0 || item.rebate_lixibao > 0 || item.lottery">

						<view class="vvItem" v-if="item.bonus > 0">
							<view class="f26">{{ t('act.a_s4') }}</view>
							<view class="" :style="{ color: store.$state.contentColor }"> +{{ item.bonus }} {{ currency }}
							</view>
						</view>
						<view class="vvItem" v-if="item.rebate_lixibao > 0">
							<view class="f26">{{ t('act.a_s5') }}</view>
							<view class="" :style="{ color: store.$state.contentColor }">+{{ item.rebate_lixibao }}
								{{ currency }}</view>
						</view>
						<view class="vvItem" v-if="item.lottery">
							<view class="f26">{{ t('act.a_s6') }}</view>
							<view class="" :style="{ color: store.$state.contentColor }">
								+ {{ item.lottery }}
							</view>
						</view>
						<view class="vvItem">
							<view class="f26">{{ t('act.a_s7') }}</view>
							<view class="" :style="{ color: store.$state.contentColor }">
								{{ item.create_time }}
							</view>
						</view>
					</view>
				</view>
			</z-paging>
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
		url: 'activity/signIn/log',
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
