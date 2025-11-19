<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{ t('wr.w_a1') }}
			<view style="width: 50rpx;" class="center">
				<image src="/static/record.png" style="width: 48rpx;height: 48rpx;"
					@click="goRecord('/pages/record/withdrawRecord')"></image>
			</view>
		</view>
		<view class="pdlr35 pt33">

			<view class="choItem mt38" @click="changeChoosed('showBEP20')" :style="cType == 'showBEP20' ? choStyle : ''"
				v-if="showBEP20">
				<view class="flex">
					<image src="/static/wayIcon/bep.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">USDT-BEP20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showBEP20'"></image>
				</view>
			</view>

			<view class="choItem mt38" @click="changeChoosed('usdt')" :style="cType == 'usdt' ? choStyle : ''"
				v-if="showUsdt">
				<view class="flex">
					<image src="/static/wayIcon/usdt.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">USDT-TRC20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'usdt'"></image>
				</view>
			</view>






			<view class="choItem mt38" @click="changeChoosed('showERC20')" :style="cType == 'showERC20' ? choStyle : ''"
				v-if="showERC20">
				<view class="flex">
					<image src="/static/wayIcon/erc.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">USDT-ERC20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showERC20'"></image>
				</view>
			</view>




			<view class="choItem mt38" @click="changeChoosed('showUSDC')" :style="cType == 'showUSDC' ? choStyle : ''"
				v-if="showUSDC">
				<view class="flex">
					<image src="/static/usdcp.png" mode="widthFix" style="width: 55rpx;height: 55rpx;">
					</image>
					<view class="mglr49 f28 center">USDC_Polygon</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDC'"></image>
				</view>
			</view>
			<view class="choItem mt38" @click="changeChoosed('showUSDCTRC')"
				:style="cType == 'showUSDCTRC' ? choStyle : ''" v-if="showUSDCTRC">
				<view class="flex">
					<image src="/static/wayIcon/USDC-TRC20.png?v=1" mode="widthFix" style="width: 55rpx;height: 55rpx;">
					</image>
					<view class="mglr49 f28 center">USDC-TRC20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDCTRC'"></image>
				</view>
			</view>
			<view class="choItem mt38" @click="changeChoosed('showUSDCErc')"
				:style="cType == 'showUSDCErc' ? choStyle : ''" v-if="showUSDCErc">
				<view class="flex">
					<image src="/static/USDC-ERC.png?v=1" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">USDC-ERC20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDCErc'"></image>
				</view>
			</view>
			<view class="choItem mt38" @click="changeChoosed('showUSDCBep')"
				:style="cType == 'showUSDCBep' ? choStyle : ''" v-if="showUSDCBep">
				<view class="flex">
					<image src="/static/USDC-BEP20.png?v=1" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">USDC-BEP20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDCBep'"></image>
				</view>
			</view>
			<view class="choItem" @click="changeChoosed('other')" :style="cType == 'other' ? choStyle : ''"
				v-if="showBank">
				<view class="flex">
					<image :src="store.$state.imgObj.other" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">Other</view>
				</view>
				<!-- {{store.$state.imgObj.ohter}} -->
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'other'"></image>
				</view>
			</view>
			<!-- btn -->
			<view class="mainContentBtn" :style="{ background: store.$state.contentColor }" @click="changePage">
				{{ t('all.a_c1') }}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		request
	} from '../../../comm/request.ts';
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

	const choStyle = {
		background: store.$state.contentColor,
		animation: '.2s linear all',
		color: '#fff'
	}
	const showUSDCErc = ref(false)
	const showUSDCBep = ref(false)
	const cType = ref('showBEP20')
	const changeChoosed = (type) => {
		cType.value = type
	}
	const methods = {
		back() {
			history.back()
		},
	};
	const showUsdt = ref(false)
	const showBank = ref(false)
	const showUSDC = ref(false)
	const showBEP20 = ref(false)
	const showERC20 = ref(false)
	const showUSDCTRC = ref(false)
	const getData = () => {
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			// let tempArr = [1,2]
			// console.log(tempArr.includes(12));
			let {
				withdraw_type
			} = res
			// withdraw_type = [1]

			if (withdraw_type.includes(1)) {
				showUsdt.value = true
			}
			if (withdraw_type.includes(2)) {
				showBank.value = true
			}
			if (withdraw_type.includes(4)) {
				showBEP20.value = true
			}
			if (withdraw_type.includes(5)) {
				showERC20.value = true
			}
			if (withdraw_type.includes(6)) {
				showUSDC.value = true
			}
			if (withdraw_type.includes(8)) {
				showUSDCErc.value = true
			}
			if (withdraw_type.includes(9)) {
				showUSDCBep.value = true
			}
			if (withdraw_type.includes(10)) {
				showUSDCTRC.value = true
			}
		})
	}

	const changePage = () => {
		let value = cType.value
		if (value == 'usdt') {
			uni.navigateTo({
				url: './usdtWithdraw'
			})
		} else if (value == 'other') {
			uni.navigateTo({
				url: './bankWithdraw'
			})
		} else if (value == 'showERC20') {
			uni.navigateTo({
				url: '../withdraw/usdtErcWithdraw'
			})
		} else if (value == 'showBEP20') {
			uni.navigateTo({
				url: '../withdraw/usdtBepWithdraw'
			})
		} else if (value == 'showUSDC') {
			uni.navigateTo({
				url: '../withdraw/usdcWithdraw'
			})
		} else if (value == 'showUSDCErc') {
			uni.navigateTo({
				url: '../withdraw/usdcWithdrawErc'
			})
		} else if (value == 'showUSDCBep') {
			uni.navigateTo({
				url: '../withdraw/usdcWithdrawBep'
			})
		} else if (value == 'showUSDCTRC') {
			uni.navigateTo({
				url: '../withdraw/usdcWithdrawTrc'
			})
		}
	}
	const goRecord = url => {
		uni.navigateTo({
			url
		})
	}
	// 终于可以用了
	onShow(() => {
		getData()
	})
</script>

<style lang="scss">
	.choItem {
		height: 100rpx;
		padding: 0 50rpx;
		background-color: #ccc;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30rpx;
		color: #000;

		.noCho {
			width: 35rpx;
			height: 35rpx;
			// border: 1px solid #AFAFAF;
			border-radius: 10rpx;
		}
	}

	.btns {
		margin-top: 313rpx;
		text-align: center;
		line-height: 120rpx;
		color: #fff;
		height: 120rpx;
		background: #F5B04C;

		border-radius: 80rpx;
		font-size: 36rpx;
	}
</style>