<template>
	<!-- t class="pl10 f3 -->
	<view :style="store.$state.imgObj.loginBg">


		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="goBack"></image>
			{{ t('wr.r_r1') }}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33 pb50 ">

			<view class="mt38">
				<!-- top4 -->
				<view class="mt30 top_box">
					<view class="f26 flex  col_center">
						{{ t('wr.r_r4') }}: <text class="pl10 f34"
							:style="{ 'color': store.$state.thirdColor }">{{ showTime }}</text>
					</view>
					<view class="mt34  flex-wrap between">
						<view class="items ">
							<view class="iTitle">{{ t('wr.r_r5') }}</view>
							<view :style="topItemStyle">{{ pageData.order_no }}</view>
						</view>
						<view class="items ">
							<view class="iTitle">{{ t('wr.r_r6') }}</view>
							<view :style="topItemStyle">{{ pageData.amount }}</view>
						</view>
						<view class="items topLine ">
							<view class="iTitle">{{ t('wr.r_r10') }}</view>
							<view :style="topItemStyle">
								{{ t('wr.r_r7') }}
							</view>
						</view>
						<view class="items topLine">
							<view class="iTitle">USDT-BEP20</view>
							<view :style="topItemStyle">{{ pageData.amount ? ((pageData.amount) * rate).toFixed(2) : 0 }}
							</view>
						</view>
					</view>
				</view>

				<view class="addressBox">
					<view class="typeList center mb30">
						<view class="mglr20 typeItem" v-for="(item, index) in typeList"
							:style="typeInd == index ? choStyle : ''" @click="changeCode(index)">{{ item.name }}</view>
					</view>
					<qrcode-vue :value="addresData" v-if="addresData" :size="163" level="H" />

					<view class="mt35 f26">
						{{ t('wr.r_r8') }}
					</view>
					<view class="between mt23 flex1">
						<view class=" f22 addEl flex1">
							{{ addresData }}
						</view>
						<view class="copyBtn ml20" @click="copyHandle(addresData)">{{ $t('all.a_d1') }}</view>
					</view>
				</view>

				<view class="mainCancelBtn mt78" @click="cancleOrder">
					{{ t('wr.r_r9') }}
				</view>
				<view class="mainContentBtn mt22" :style="choStyle" @click="methods.back">
					{{ t('wr.r_r3') }}
				</view>

				<view class="richText">
					<view v-html="richText"></view>
				</view>
			</view>
		</view>
		<nut-overlay v-model:visible="cancleHandlemMask">
			<div class="confirmPopWarper">
				<div class="content ">
					<view class="f40">{{ t('wr.r_r12') }}</view>
					<view class="f30 mt40">
						{{ t('wr.r_r11') }}
					</view>
					<view class="between">
						<view class="cancelBtn">{{ t('all.a_c2') }}</view>
						<view class="color0 confirmBtn" @click="confirmHandle">
							{{ t('all.a_c1') }}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
	</view>
</template>

<script setup>
import { request } from '../../../comm/request.ts';
import {
	userStore
} from "@/store/themeNum.js";
import QrcodeVue from 'qrcode.vue'
import useClipboard from 'vue-clipboard3'
import {
	Toast
} from '@nutui/nutui';
import {
	onShow,
	onLoad,
	onHide
} from "@dcloudio/uni-app";
const store = userStore();
const {
	toClipboard
} = useClipboard()
const modal_qr = ref(false)
import {
	useI18n
} from "vue-i18n";
const {
	t
} = useI18n();
const methods = {
	back() {
		if (!uploadTxid.value) {
			uni.navigateTo({
				url: "../tabbar/recharge"
			})
			return false
		} else {
			uni.navigateTo({
				url: "./usdtBepTxid"
			})
		}

	},
};
const goBack = () => {
	uni.navigateTo({
		url: "../tabbar/recharge"
	})
}

const typeList = [{
	name: 'BEP20'
},
	// {
	// 	name:'USDT'
	// }
]
const typeInd = ref(0)

const choStyle = {
	background: store.$state.contentColor,
	color: '#fff',
	border: 'none'
}
const noStyle = {
	color: store.$state.contentColor,
}
const topItemStyle = {
	color: store.$state.thirdColor,
	marginTop: '10rpx'
}
const changeCode = (ind) => {
	typeInd.value = ind
	// if (typeInd.value == 0) {
	// 	codeUrl.value = "https://www.baidu.com"
	// } else if (typeInd.value == 1) {
	// 	codeUrl.value = "https://www.bilibili.com/"
	// }
}
const pageData = ref({})
const addresData = ref("")

const timer = ref(null)
const showTime = ref(0)
const rate = ref(0)
const times = ref(0)
const richText = ref("")
const getData = () => {
	request({
		url: 'finance/usdtBep/recharge/index',
		methods: 'get'
	}).then(res => {
		if (!res.order) {
			goBack()
			return false
		}
		richText.value = res.desc
		addresData.value = res.address
		pageData.value = res.order
		res.type == 1 ? uploadTxid.value = false : uploadTxid.value = true
		rate.value = res.rate
		if (timer.value) {
			clearInterval(timer.value)
		}
		times.value = res.order.expire_time
		startTimer()
	})
}
const changePage = () => {
	uni.navigateTo({
		url: "./usdtBepTxid"
	})
}
const copyHandle = async (data) => {
	try {
		await toClipboard(data)
		Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
	} catch (e) {
		console.error(e)
	}
}
const cancleHandlemMask = ref(false)
const uploadTxid = ref(null)

const cancleOrder = () => {
	cancleHandlemMask.value = true
}
const confirmHandle = () => {
	request({
		url: 'finance/usdtBep/recharge/cancel',
		methods: 'post',
		data: {
			order_no: pageData.value.order_no
		}
	}).then(res => {
		Toast.text(t('wr.r_r13'))
		goBack()
	}).catch(err => {
		Toast.text(err.message)
	})
}
const changeTime = (num) => {
	let minute = parseInt(num / 60)
	let second = num % 60
	showTime.value = (minute < 10 ? '0' + minute : minute) + ":" + (second < 10 ? '0' + second : second)
}
// 开始时间减减

const startTimer = () => {
	const that = this
	timer.value = setInterval(() => {
		if (times.value == 0) {
			clearTimeout(timer.value)
			goBack()
		} else {
			times.value--;
			changeTime(times.value)
		}
	}, 1000)
}
// 终于可以用了
onShow(() => {
	getData()
})
onHide(() => {
	if (timer.value) {
		clearInterval(timer.value)
	}
})
</script>

<style lang="scss">
page {
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}

.btns {
	height: 120rpx;
	line-height: 120rpx;
	text-align: center;
	border-radius: 80rpx;
}

.top_box {
	padding: 35rpx 40rpx;
	background-color: #fff;
	border-radius: 30rpx;
	color: #000;

	.items {
		width: 48%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		height: 140rpx;
		font-size: 24rpx;
		background-color: #FFF8F2;
		margin-bottom: 24rpx;
		border-radius: 20rpx;
		color: #000;
	}

	.flex-wrap {
		flex-wrap: wrap;
	}
}


.addressBox {
	margin-top: 40rpx;
	// display: flex;
	// align-items: center;
	// flex-direction: column;
	text-align: center;
	padding: 27rpx 31rpx 48rpx 31rpx;
	border-radius: 30rpx;
	background-color: #fff;
	color: #000;

	.typeItem {
		padding: 14rpx 32rpx;
		border-radius: 10rpx;
		border: 1rpx solid #eee;
	}

	.addEl {
		color: #000;
		height: 60rpx;
		background: #FEF3DE;
		border-radius: 10rpx;
		text-align: center;
		line-height: 60rpx;
		width: 100%;
		background-color: #FFF8F2;
		overflow-x: scroll;
		overflow-y: hidden;

		::-webkit-scrollbar {
			display: none;
		}
	}
}

::-webkit-scrollbar {
	display: none;
}
</style>
