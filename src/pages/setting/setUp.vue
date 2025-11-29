<template>
	<!-- -for="(item,index) in settingList" @click="methods.ch -->
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{ t('x.m7') }}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33">

			<view class="mt27">
				<view v-for="(item, index) in settingList" @click="methods.changePage(item.url)">
					<view v-if="item.flag" class="between mb30 settingItem">
						<view class="flex col_center">
							<image :src="item.img" style="width: 50rpx; height: 50rpx;"></image>
							<view class="mglr20" style="flex: 1;">
								{{ item.name }}
							</view>
						</view>
						<nut-icon name="rect-right" size="14" :color="store.$state.secondColor"></nut-icon>
					</view>
				</view>
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
const store = userStore();

import {
	useI18n
} from 'vue-i18n'

const {
	t
} = useI18n()

const loginOutMask = ref(false)
const settingList = ref([

	// 地址设置
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDT-TRC20)',
		url: './set2',
		type: 'usdt',
		flag: false
	},
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDT-ERC20)',
		url: './bindERC',
		type: 'erc',
		flag: false
	},
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDT-BEP20)',
		url: './bindBEP',
		type: 'bep',
		flag: false
	},
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDC-BEP20)',
		url: './BindUSDCMain?type=8',
		type: 'usdcBep',
		flag: false
	},
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDC-ERC20)',
		url: './BindUSDCMain?type=9',
		type: 'usdcErc',
		flag: false
	},
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDC-TRC20)',
		url: './BindUSDCMain?type=10',
		type: 'usdcTrc',
		flag: false
	},
	{
		img: '/static/setting/s1-.png',
		name: t('inp.i_s5') + '(USDC_Polygon)',
		url: './bindUSDC',
		type: 'usdc',
		flag: false
	},
	// 银行卡设置
	{
		img: '/static/setting/s2-.png',
		name: t('inp.i_s4'),
		url: './set1',
		type: 'bank',
		flag: false
	},
])

// 　const { t } = useI18n()
const methods = {
	back() {
		history.back()
	},

	changePage(url) {

		uni.navigateTo({
			url,
		})
	}

};

const getData = () => {
	request({
		url: 'setting/financeWay',
		methods: 'get'
	}).then(res => {
		let {
			withdraw_type
		} = res
		//数组 可以包含多个方式 1.USDT  2.三方
		if (withdraw_type.includes(1)) {
			settingList.value.filter(item => item.type == 'usdt')[0].flag = true
		}
		if (withdraw_type.includes(2)) {
			settingList.value.filter(item => item.type == 'bank')[0].flag = true
		}
		if (withdraw_type.includes(4)) {
			settingList.value.filter(item => item.type == 'bep')[0].flag = true
		}
		if (withdraw_type.includes(5)) {
			settingList.value.filter(item => item.type == 'erc')[0].flag = true
		}
		if (withdraw_type.includes(6)) {
			settingList.value.filter(item => item.type == 'usdc')[0].flag = true
		}
		if (withdraw_type.includes(8)) {
			settingList.value.filter(item => item.type == 'usdcBep')[0].flag = true
		}
		if (withdraw_type.includes(9)) {
			settingList.value.filter(item => item.type == 'usdcErc')[0].flag = true
		}
		if (withdraw_type.includes(10)) {
			settingList.value.filter(item => item.type == 'usdcTrc')[0].flag = true
		}
	})
}
const confirmHandle = () => {
	uni.navigateTo({
		url: '../login/login'
	})
}

// 终于可以用了
onShow(() => {
	getData()
})
</script>

<style lang="scss">
.settingItem {
	padding: 35rpx 50rpx;
	border-radius: 30rpx;
	background-color: #fff;
	font-size: 26rpx;
	color: #000;
}
</style>