<template>
	<!-- -text="t('record.r_r3')" styl -->
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			<view>
				{{ t('record.r_a1') }}
			</view>
			<view class="center" style="width: 50rpx;height: 50rpx;">

			</view>
		</view>
		<view class="pdlr35 pt33">
			<z-paging class="mt54 " ref="paging" v-model="recordsList" @query="getData" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
				:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
				:loading-more-fail-text="t('record.r_r3')" style="margin: 100rpx auto 0;width: 100%;  ">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="vvItem">
						<view class="f26">{{ t('mine.m_s10') }}</view>
						<view class=""> {{ item.amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ t('record.r_a2') }}</view>
						<view class="">{{ item.arrive_amount }}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ t('record.r_a3') }}</view>
						<view class="">
							{{ item.order_no }}
						</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{ t('record.r_a4') }}</view>
						<view class="">{{ item.createTime }}</view>
					</view>

					<view class="vvItem">
						<view class="f26">{{ t('all.a_d2') }}</view>
						<view class="">
							<text v-if="item.status == 0" class="cancle">{{ t('record.r_a5') }}</text>
							<text v-if="item.status == 1" class="pass">{{ t('record.r_a6') }}</text>
							<text v-if="item.status == 2" class="error">{{ t('record.r_a7') }}</text>
							<text v-if="item.status == 3" class="cancle">{{ t('record.r_a8') }}</text>
							<text v-if="item.status == 4" class="error">{{ t('record.r_a9') }}</text>
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
		url: 'user/record/recharge',
		data: pages.value
	}).then(res => {
		paging.value.complete(res.data);
		pages.value.page += 1
	})
}
// 终于可以用了
onLoad(() => {

})
</script>

<style lang="scss"></style>