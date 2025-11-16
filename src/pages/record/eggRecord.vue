<template>
	<view :style="store.$state.imgObj.loginBg">
	<view class="between topNavBar">
		<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
			@click="methods.back"></image>
		<view>
			{{t('act.e_e16')}}
		</view>
		<view class="center" style="width: 50rpx;height: 50rpx;">
			
		</view>
	</view>
		<view class="pdlr35 pt33">

			<z-paging class="mt54" ref="paging" v-model="recordsList" @query="getData" width="100%" :fixed="false"
				:use-page-scroll="true" :refresher-enabled="false" :to-bottom-loading-more-enabled="true"
				:auto-show-back-to-top="true" :safe-area-inset-bottom="true" :empty-view-text="t('record.r_r1')"
				:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')">
				<view class="listItem" v-for="(item, index) in recordsList" :key="index">
					<view class="f28" :style="{color:store.$state.contentColor}">

					</view>
					<view class="vvItem" style="margin-top: 0;">
						<view class="f26">{{t('act.e_e17')}}</view>
						<view class="error text_bold"> {{ item.price }} {{currency}}</view>
					</view>
					<view class="vvItem">
						<view class="f26">{{t('act.e_e18')}}</view>
						<view class="">
							{{item.createTime}}
						</view>
					</view>

				</view>
			</z-paging>
		</view>
	</view>
</template>

<script setup>
	import {request} from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		Toast
	} from '@nutui/nutui';
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

	const showBtn = ref(false)
	const getData = (page) => {
		pages.value.page = page
		request({
			methods: 'get',
			url: 'activity/goldenEgg/log',
			data: {
				goldenEggId: actId.value,
				...pages.value
			}
		}).then(res => {
			paging.value.complete(res.data);
			pages.value.page += 1
		})
		request({
			methods: 'get',
			url: 'setting/lixibao',
		}).then(res => {
			res.can_interrupt == 1 ? showBtn.value = true : showBtn.value = false
		})

	}


	const actId = ref(0)
	const currency = ref("")
	// 终于可以用了
	onLoad((e) => {
		actId.value = e.id
		currency.value = uni.getStorageSync('currency')
		// getData()
	})
</script>

<style lang="scss">
	page {
		font-family: PingFangSC;
	}

	.listItem {

		.pass {
			color: #5db760;
		}

		.error {
			color: #f5564b;
		}

		.cancle {
			color: #AFAFAF;
		}

		.btns {
			margin-top: 29rpx;
			color: #fff;
			border-radius: 10rpx;
			text-align: center;
			line-height: 90rpx;
			height: 90rpx;
		}
	}
</style>
