<template>
	<view class="">
		<view class="text_center  taskTop">
			<view class="topNavBar pdlr30" style="height: 100rpx;">
				<view class="between " >
					<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
						@click="methods.back"></image>
					<view class="f34 text_bold textUpper">{{$t('x.a11')}}</view>
				<view style="width: 50rpx;">
					
				</view>
				</view>
			</view>
			<view class="pdlr30">
				<view class="mt30 f32 gridBox2">
					<view v-for="item in tabs" class="topTab" :class="item.value == actTabVal?'actTabEl':''"
						@click="changeTab(item)">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view class="">
			<z-paging class="" ref="paging" v-model="taskRecordList" @query="getRecordList" width="100%"
				:refresher-enabled="false" :to-bottom-loading-more-enabled="true" :auto-full-height="true"
				:auto-show-back-to-top="true" :empty-view-text="t('record.r_r1')"
				:loading-more-no-more-text="t('record.r_r1')" :empty-view-reload-text="t('record.r_r2')"
				:loading-more-loading-text="t('record.r_r4')" :loading-more-fail-text="t('record.r_r3')">
				<view class=" pdlr35 recordContent ">
					<view class="taskItem flex  mb30" v-for="item in taskRecordList">

						<view class="">
							<image :src="item.goods?.pic" class="bbo10" style="width:240rpx ;height: 240rpx;"></image>
						</view>
						<view class="ml20">
							<view class="textHidden color3 " style="height: 70rpx;">{{item.goods?.name}} </view>
							<view class="mt5 between listNameT">
								<view class=" textHiddenOne" v-if="item.vip?.name">{{item.vip?.name}}</view>
								<view class=" ml10 textHiddenOne" v-if="item.vip?.title"> {{item.vip?.title}}</view>
							</view>
							<view class="mt5 colorC f26 between">
								<view>{{t('x.ta1')}}</view>
								<view>{{currency + item.order_price}}</view>
							</view>
							<view class="mt5 between">
								<view class="color3 f26">{{t('x.ta2')}}</view>
								<view class="mainTextColor  text_bold">
									{{currency + item.commission}}
								</view>
							</view>
							<view class="mt5" v-if="actTabVal <2">
								<view class="contentBtn" @click="completeHandle(item)" >
									{{t('x.ta3')}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>

		<nut-overlay v-model:visible="showResPop">
			<view class="overlay-body">
				<view class="overlay-content">

					<view class="title center">{{resPopType<2?t('x.ta4'):t('x.ta5')}}</view>
				<!-- 	<view class="content center">
						<image class="c_img" v-if="resPopType <2" src="/static/task/p_s.png" mode="widthFix"></image>
						<image class="p_img" v-else src="/static/task/p_w.png" mode="widthFix"></image>
					</view> -->
					<view style="height: 260rpx;"></view>
					<view class="center">
						<nut-progress style="width: 60%;" :percentage="percentageVal" :show-text="false"
							stroke-color="linear-gradient( 90deg, #FF5F4E 0%, #FFA601 100%)" />
					</view>
					<view class="mt10" style="color: #000;" v-if="resPopType>1">
						{{t('x.ta6')}}: <br>
						<span class="mainTextColor"> {{needAmount + currency}}</span>
					</view>
					<!-- v-if="percentageVal == 100 || resPopType>1" -->
				
					<view class="closeBtn">
						<view class="center " :class="resPopType>1?'mt20':'mt40'" >
							<view class="confirmBtn " @click="goTaskList">{{t('all.a_c1')}}</view>
						</view>
					</view>
					<view class="closeBtn closeBtn2">
						<image src="/static/task/p_close.png" @click="showResPop = false" mode="widthFix"
							style="height: 80rpx; width: 80rpx;"></image>
					</view>
				</view>
			</view>
		</nut-overlay>
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
	const showLoading = ref("")
	const actTabVal = ref(1)
	const tabs = ref([{
			name: t('x.ta7'),
			value: 1
		},
		{
			name: t('x.ta8'),
			value: 2
		}
	])
	const showResPop = ref(false)
	const resPopType = ref(1) //1 success 2 wait
	const changeTab = item => {
		actTabVal.value = item.value
		pages.value.page = 1
		paging.value.clean()
		getRecordList()
	}
	const pages = ref({
		page: 1,
		size: 10
	})
	const orderInfo = ref({})
	const currency = localStorage.getItem('currency')
	const paging = ref("")
	const taskRecordList = ref([])
	const getRecordList = () => {
		showLoading.value.loading = true
		request({
			url: 'task/conveyList',
			data: {
				status: actTabVal.value,
				...pages.value
			}
		}).then(res => {
			paging.value.complete(res.list.data);
			pages.value.page += 1
		}).finally(() => {
			showLoading.value.loading = false
		})
	}
	const goTaskList = () => {
		showResPop.value = false
		if (resPopType.value > 1) {
			uni.navigateTo({
				url: '../tabbar/recharge?needAmount=' + needAmount.value
			})
		} else {
		
			submitHandle()
		}

	}
	const needAmount = ref(0)
	const percentageVal = ref(0)
	const completeHandle = (item) => {
		needAmount.value = item.need_recharge
		if(needAmount.value >0){
			percentageVal.value = Number(userBalance.value / (Number(needAmount.value )+Number(userBalance.value))) .toFixed(2) *100
			resPopType.value = 2
			showResPop.value = true
			return 
		}
		percentageVal.value = 0
		orderInfo.value = item
		showResPop.value = true
		startTimer()
	}
	const timer = ref()
	const startTimer = () => {

		if (timer.value) {
			clearInterval(timer.value);
		}

		const startValue = 0;
		const endValue = 100;
		const duration = 10000; // 10秒，单位毫秒
		const intervalTime = 50; // 每50毫秒更新一次

		const totalSteps = duration / intervalTime;
		const increment = (endValue - startValue) / totalSteps;

		let currentValue = startValue;

		timer.value = setInterval(() => {
			currentValue += increment;

			if (currentValue >= endValue) {
				currentValue = endValue; // 确保最终值为100
				clearInterval(timer); // 停止定时器
			}
			percentageVal.value = currentValue
		}, intervalTime);
	}
	const submitHandle = () => {
		showLoading.value.loading = true
		request({
			url: 'task/conveyPay',
			methods: "POST",
			data: {
				order_no: orderInfo.value.order_no
			}
		}).then(res => {
			changeTab({
				value: 1
			})
		}).catch(e => {
			Toast.text(e.message)
		}).finally(() => {
			showLoading.value.loading = false
		})
	}
	const userBalance = ref(0)
	const getData = () => {
		request({
			url: '/user/index'
		}).then(res => {
			userBalance.value = res.balance
		})
	}
	onLoad(() => {
		getData()
	})
</script>

<style lang="scss" scoped>
	:deep(.nut-progress-outer) {
		background: #8C1102;
	}
	// .topNavBar {
	// 	position: fixed;
	// 	width: calc(100% - 48rpx);
	// 	padding: 0 24rpx;
	// 	z-index: 99;
	// }

	.overlay-body {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;

		.overlay-content {
			width: 600rpx;
			height: 400rpx;
			background: url('/static/task/mg1.png') no-repeat;
			background-size: cover;
			background-position: center;
			text-align: center;
			padding: 100rpx 20rpx 20rpx;
			color: #000;
			position: relative;

			.closeBtn {
				position: absolute;
				bottom: -130rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			.closeBtn2{
				top: -20rpx;
				left: 90%;
				transform: translateX(-100%);
			}
			.title {
				max-width: 70%;
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
				margin: 0 auto;
				// height: 100rpx;
			}

			.mainTextColor {
				color: #FF7C35;
				font-weight: bold;
				font-size: 34rpx;
			}

			.content {
				.c_img {
					width: 260rpx;
					height: 260rpx;
					margin-top: 40rpx;
				}

				.p_img {
					width: 190rpx;
					height: 190rpx;
					margin-top: 40rpx;
				}

			}

			.confirmBtn {
				background: url('/static/task/maskBtn.png') no-repeat;
				height: 100rpx;
				width: 400rpx;
				background-size: contain;
				line-height: 80rpx;
				color: #fff;
				background-position: center;
			}
		}
	}

	.taskTop {
		color: #fff;
		// padding: 30rpx 0;
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 99;
		// height: 180rpx;
		.gridBox2 {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			text-align: center;
			font-weight: bold;
			background: #fff;
			color: #B2B2B2;
			padding: 10rpx 0 30rpx 0;
			box-shadow: 0px 2px 8px 0px rgba(143,86,86,0.25);
			border-radius: 10rpx;
			.topTab {
				position: relative;
				padding: 15rpx 0;
			}
			.actTabEl{
				color:#FF7C35;
			}
			.actTabEl::after {
				display: block;
				background: currentColor;
				position: absolute;
				content: '';
				width: 40%;
				height: 8rpx;
				border-radius: 10rpx;
				left: 50%;
				transform: translateX(-50%);
				bottom: -10rpx;
			}
		}

	}

	.recordContent {
		margin-top: 250rpx;

		.taskItem {
			padding: 24rpx;
			font-size: 24rpx;
			border-radius: 10rpx;
			background: #fff;
			box-shadow: 0px 2px 8px 0px rgba(143, 86, 86, 0.25);

			.color3 {
				color: #333;
			}

			.colorC {
				color: #B2B2B2;
			}

			.mainTextColor {
				color: #FF7C35;
			}
	.listNameT{
			background: url('../../static/task/nameT.png') no-repeat;
			height: 50rpx;
			background-size: cover;
			line-height: 50rpx;
			padding: 0 20rpx;
			color:#fff ;
		}
		}
	}
</style>