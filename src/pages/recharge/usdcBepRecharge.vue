<template>
	<!-- lass="short">USDC</view> -->
	<view :style="store.$state.imgObj.loginBg">

		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{t('wr.r_r1')}}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33 pb50 ">

			<view class="mt55">


				<view class="mainBox">
					<view class="flex">
						<view class="short">{{currency}}</view>
						<input type="text" :disabled="needAmount>0" placeholder-class="plo" focus
							:placeholder="t('mine.m_s7')" v-model="inputNum">
					</view>

					<view class="flex mt30">
						<view class="short">USDC</view>
						<input type="number" style="color: #F65E5E;" disabled
							:value="((inputNum?inputNum:0 ) * pageData.rate).toFixed(2)">
					</view>

					<view class="mt44">
						<view class="tips">
							{{t('wr.r_r15')}} : {{ pageData.min+ currency}} - {{ pageData.max+ currency}}
						</view>
					</view>
				</view>


				<view class="mainContentBtn" @click="goOrder">
					{{t('wr.r_r3')}}
				</view>

				<view class="richText">
					<view v-html="pageData.desc"></view>
				</view>
			</view>
		</view>


		<Loading ref="showLoading"></Loading>
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
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const methods = {
		back() {
			history.back()
		},
	};
	const pageData = ref({
		rate: 0
	})
	const inputNum = ref("")
	const choStyle = {
		background: store.$state.contentColor,
		color: '#000'
	}
	const showLoading = ref(null)
	const goOrder = () => {
		if ((inputNum.value - 0) < (pageData.value.min - 0) || (inputNum.value - 0) > (pageData.value.max - 0)) {
			Toast.text(t('wr.r_r16'))
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			goOrder1()
		}, 2000)
	}
	const goOrder1 = () => {


		const data = {
			amount: inputNum.value
		}
		request({
			url: 'finance/usdcBep/recharge/submit',
			methods: 'post',
			data: data
		}).then(res => {
			showLoading.value.loading = false
			uni.navigateTo({
				url: './usdcBepOrder'
			})
		}).catch(err => {
			showLoading.value.loading = false
			uni.showToast({
				title: err.message,
				icon: 'none'
			})
		})
	}
	const getData = () => {
		request({
			url: 'finance/usdcBep/recharge/index',
			methods: 'get'
		}).then(res => {
			if (res.order) {
				uni.navigateTo({
					url: './usdcBepOrder'
				})
				return false
			}
			pageData.value = res
		})
	}
	watch(inputNum, (newValue, oldValue) => {
		// 如果新值为空，则允许
		if (newValue === '') {
			return;
		}
		const regex = /^\d*(\.?\d*)?$/;
		// 如果新值不合法
		if (!regex.test(newValue)) {
			// 使用 nextTick 确保在DOM更新之后再赋值
			nextTick(() => {
				inputNum.value = oldValue === null ? '' : oldValue;
			});
		}
	});
	const currency = ref("")
	// 终于可以用了
	onShow(() => {
		getData();
		currency.value = uni.getStorageSync('currency')
	})

	const needAmount = ref(0)
	onLoad(e => {
		if (e.needAmount) {
			needAmount.value = e.needAmount
			inputNum.value = e.needAmount
		}
	})
</script>

<style lang="scss">
	.mainBox {
		margin-top: 36rpx;
		border-radius: 30rpx;
		padding: 32rpx 57rpx;
		font-size: 28rpx;
		background-color: #fff;
		color: #000;

		.flex {
			display: flex;
			align-items: center;
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

			.short {
				width: 30%;
				text-align: center;
				font-weight: bold;
			}

			input {
				margin-left: 30rpx;
				font-size: 30rpx;
				font-weight: bold;
			}
		}

		.tips {
			background-color: #fff;
			border-radius: 10rpx;
			padding: 20rpx;
			font-size: 20rpx;
			width: auto;
			color: #000;
			display: inline-block;
		}
	}

	.btns {
		margin-top: 200rpx;
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 80rpx;
	}
</style>