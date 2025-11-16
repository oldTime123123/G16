<template>
	<view :style="store.$state.imgObj.loginBg">

		<view class="pdlr35 pt33 pb50">

			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
			</view>
			<view class="f50 mt60 text_bold" :style="{color:store.$state.thirdColor}">{{t('all.skyPay')}}</view>
			<view class="mt38 flex wrap between">
				<view class="topItem" v-for="item in topList">
					<view class="f20">{{item.name}}</view>
					<view class="f32" :style="{color:store.$state.contentColor}">{{item.value}}</view>
				</view>
			</view>
			<view class="mainBox">
				<view class="withTitle" :style="choStyle">
				
					{{t('mine.m_s6')}}
				</view>
				<view class="flex mt70">
					<view class="short">{{currency}}</view>
					<input type="text" placeholder-class="plo" style="color: #fff;" focus v-model="inputNum"
						:placeholder="t('mine.m_s7')">
				</view>

				<view class="flex mt30">
					<view class="short">{{t('mine.m_s5')}}</view>
					<input type="text" disabled style="color: #F65E5E;"
						:value="(inputNum * (botList[botInd]?botList[botInd].rate:0)).toFixed(2)">
				</view>
			</view>

			<view class="mt42 bTitle" :style="{background:store.$state.contentColor}">
				{{t('mine.m_s8')}}
			</view>

			<view class="mt32  wrap between">
				<view class="botItem" v-for="(item,index) in botList" :style="botInd==index?choStyle:''"
					@click="botInd = index">
					<view>{{item.title}}</view>
					<view class="mt20"> rate of return: + {{(item.rate *100 ).toFixed(2)+'%'}}</view>
					<view class="mt20">{{item.day}} {{t('mine.m_s9')}}</view>
					<view class="mt20">{{t('mine.m_s10')}}:{{currency}} {{item.min_num}} - {{currency}}{{item.max_num}}
					</view>
				</view>
			</view>
			<view class="btns mt70" :style="choStyle" @click="methods.transferInHandle">
				{{t('mine.m_s6')}}
			</view>
			<view class="btns mt30" :style="noStyle" @click="methods.changePage">
				{{t('mine.m_s11')}}
			</view>

		</view>

		<nut-overlay v-model:visible="buHandleMask">
			<div class="wrapper">
				<div class="content ">
					<view class="f40">{{t('mine.m_s12') + " " + t('all.skyPay')}}</view>
					<view class="f30 mt40">
						{{t('mine.m_s12') + " " + inputNum + ' ' + currency}}
					</view>

					<view class="between">
						<view :style="{background:store.$state.secondColor}">{{ t('all.a_c2')}}</view>
						<view :style="{background:store.$state.contentColor}" @click="confirmHandle"> {{t('all.a_c1')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
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
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const store = userStore();

	const topList = ref([{
			name: t('wr.w_a2'),
			value: 0
		},
		{
			name: t('mine.m_s3'),
			value: 0.00
		},
		{
			name: t('mine.m_s4'),
			value: 0
		},
		{
			name: t('mine.m_s5'),
			value: 0
		},
	])
	const botList = ref([])
	const inputNum = ref("")
	const botInd = ref(0)
	const choStyle = {
		background: store.$state.contentColor,
		color: '#000'
	}

	const noStyle = {
		background: '#fff',
		color: store.$state.contentColor,
		'box-shadow': 'none'
	}

	const getData = () => {

		request({
			url: 'lixibao/index',
			methods: 'get'
		}).then(res => {
			topList.value[0].value = res.balance
			topList.value[1].value = res.lixibao_shouru
			topList.value[2].value = res.lixibao_balance
			topList.value[3].value = res.lixibao_shouru_yuji
			// console.log(res);
			botList.value = res.lixibaos
		})
	}
	// 　const { t } = useI18n()
	const methods = {
		back() {
			history.back()
		},
		changePage() {
			uni.navigateTo({
				url: '../record/skyPayRecord'
			})
		},
		transferInHandle() {
			if (parseInt(inputNum.value) > parseInt(topList.value[0].value) || inputNum.value <= 0) {
				Toast.text(t('mine.m_s13'))
				return false
			}
			buHandleMask.value = true
		}
	};
	const confirmHandle = () => {
		const data = {
			id: botList.value[botInd.value].id,
			amount: inputNum.value
		}
		request({
			url: 'lixibao/invest',
			methods: 'post',
			data: data
		}).then(res => {
			getData()
			inputNum.value = ""
			Toast.text(t('mine.m_s14'))
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const buHandleMask = ref(false)
	const currency = ref("")
	// 终于可以用了
	onShow(() => {
		getData()
		currency.value = uni.getStorageSync('currency')
	})
</script>

<style lang="scss">
	.btns {
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 35rpx;
	}

	.topItem {
		margin-bottom: 20rpx;
		width: 48%;
		background-color: #314539;
		border-radius: 20rpx;
		height: 100rpx;
		text-align: center;
		padding: 20rpx 0;
		color: #fff;
		view:nth-child(1) {
			height: 60%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.mainBox {
		margin-top: 36rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #314539;
		position: relative;
		color: #fff;
		.withTitle {
			position: absolute;
			left: 0;
			top: 0;
			border-radius: 30rpx 0 30rpx 0;
			padding: 23rpx 48rpx;
			display: flex;
			align-items: center;
		}

		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

			.short {
				width: 80%;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

	}

	.bTitle {
		color: #000;
		border-radius: 50rpx;
		padding: 0 47rpx;
		display: inline-block;
		font-size: 32rpx;
		line-height: 80rpx;
		height: 80rpx;
	}

	.botItem {
		margin-bottom: 20rpx;
		width: 48%;
		background-color: #fff;
		border-radius: 20rpx;
		text-align: center;
		font-size: 22rpx;
		padding: 26rpx 0;
	}

	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 400rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 350rpx;
			background: #314539;
			border-radius: 30rpx;
			// justify-content: center;
			padding-top: 50rpx;
			position: relative;
			overflow: hidden;
			color: #fff;
			.between {
				position: absolute;
				bottom: 0;
				width: calc(100% - 80rpx);
				padding: 0 30rpx 40rpx;

				view {
					width: 48%;
					height: 100rpx;
					color: #000;
					text-align: center;
					line-height: 100rpx;
					font-size: 30rpx;
					border-radius: 50rpx
				}
			}
		}
	}
</style>
