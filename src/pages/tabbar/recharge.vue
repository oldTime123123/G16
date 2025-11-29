<template>
	<!-- cord/rechargeRecord')"></imag -->
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{ t('tabbar.t_t4') }}
			<view style="width: 50rpx;height: 50rpx;" class="center">
				<image src="/static/record-.png" style="width: 48rpx;height: 48rpx;"
					@click="changePage('/pages/record/rechargeRecord')"></image>
			</view>
		</view>
		<view class="pdlr49 ">

			<view class="choItem mt38" @click="changeChoosed('showBEP20')" :style="cType == 'showBEP20' ? choStyle : ''"
				v-if="showBEP20">
				<view class="flex">
					<image src="/static/wayIcon/bep-.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
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
					<image src="/static/wayIcon/usdt-.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
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
					<image src="/static/wayIcon/erc-.png" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
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
					<image src="/static/usdcp-.png" mode="widthFix" style="width: 55rpx;height: 55rpx;">
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
					<image src="/static/wayIcon/USDC-TRC20-.png?v=1" mode="widthFix" style="width: 55rpx;height: 55rpx;">
					</image>
					<view class="mglr49 f28 center">USDC-TRC20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDCTRC'"></image>
				</view>
			</view>
			<view class="choItem mt38" @click="changeChoosed('showUSDCBEP')"
				:style="cType == 'showUSDCBEP' ? choStyle : ''" v-if="showUSDCBEP">
				<view class="flex">
					<image src="/static/USDC-BEP20-.png?v=1" mode="widthFix" style="width: 55rpx;height: 55rpx;">
					</image>
					<view class="mglr49 f28 center">USDC-BEP20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDCBEP'"></image>
				</view>
			</view>
			<view class="choItem mt38" @click="changeChoosed('showUSDCERC')"
				:style="cType == 'showUSDCERC' ? choStyle : ''" v-if="showUSDCERC">
				<view class="flex">
					<image src="/static/USDC-ERC-.png?v=1" mode="widthFix" style="width: 55rpx;height: 55rpx;">
					</image>
					<view class="mglr49 f28 center">USDC-ERC20</view>
				</view>

				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'showUSDCERC'"></image>
				</view>
			</view>
			<view class="choItem" @click="changeChoosed('bank')" :style="cType == 'bank' ? choStyle : ''"
				v-if="showBank">
				<view class="flex">
					<image :src="store.$state.imgObj.bank" mode="widthFix" style="width: 55rpx;height: 55rpx;"></image>
					<view class="mglr49 f28 center">Bank Card</view>
				</view>
				<view class="noCho">
					<image :src="store.$state.imgObj.choosed" mode="widthFix" style="width: 35rpx;height: 35rpx;"
						v-if="cType == 'bank'"></image>
				</view>
			</view>

			<!-- btn -->
			<view class="mainContentBtn f34" :style="{ background: store.$state.contentColor }" @click="chooseHandle">
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
	const methods = {
		back() {
			uni.navigateTo({
				url: "../tabbar/my"
			})
		},

	};
	const {
		t
	} = useI18n();

	const choStyle = {
		background: store.$state.contentColor,
		animation: '.2s linear all',
		color: '#fff'
	}
	const cType = ref('showBEP20')
	const changeChoosed = (type) => {
		cType.value = type
	}

	const showUsdt = ref(false)
	const showBank = ref(false)
	const showUSDC = ref(false)
	const showBEP20 = ref(false)
	const showERC20 = ref(false)
	const showUSDCBEP = ref(false)
	const showUSDCERC = ref(false)
	const showUSDCTRC = ref(false)
	const goAdd = ref(false)
	const getData = () => {
		request({
			url: 'setting/financeWay',
			methods: 'get'
		}).then(res => {
			let {
				recharge_type
			} = res

			if (recharge_type.includes(1)) {
				showUsdt.value = true
			}
			if (recharge_type.includes(2)) {
				showBank.value = true
			}
			if (recharge_type.includes(4)) {
				showBEP20.value = true
			}
			if (recharge_type.includes(5)) {
				showERC20.value = true
			}
			if (recharge_type.includes(6)) {
				showUSDC.value = true
			}
			if (recharge_type.includes(8)) {
				showUSDCBEP.value = true
			}
			if (recharge_type.includes(9)) {
				showUSDCERC.value = true
			}
			if (recharge_type.includes(10)) {
				showUSDCTRC.value = true
			}
			// console.log(res);
		})
	}

	const chooseHandle = () => {
		let value = cType.value
		if (value == 'usdt') {

			uni.navigateTo({
				url: '../recharge/usdtRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'bank') {
			uni.navigateTo({
				url: '../recharge/bankRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'showERC20') {
			uni.navigateTo({
				url: '../recharge/usdtErcRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'showBEP20') {
			uni.navigateTo({
				url: '../recharge/usdtBepRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'showUSDC') {
			uni.navigateTo({
				url: '../recharge/usdcRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'showUSDCBEP') {
			uni.navigateTo({
				url: '../recharge/usdcBepRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'showUSDCERC') {
			uni.navigateTo({
				url: '../recharge/usdcErcRecharge?needAmount=' + needAmount.value
			})
		} else if (value == 'showUSDCTRC') {
			uni.navigateTo({
				url: '../recharge/usdcTrcRecharge?needAmount=' + needAmount.value
			})
		}
	}
	const changePage = url => {
		uni.navigateTo({
			url
		})
	}
	const needAmount = ref(0)
	onLoad(e => {
		if (e.needAmount) {
			needAmount.value = e.needAmount
		}
	})
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
</style>