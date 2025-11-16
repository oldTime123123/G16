<template>
	<view :style="store.$state.imgObj.loginBg3">

		<view class="pdlr35 pt38">
			<view class="    pdlr45 pt50"
				style="background: url('/static/taskTop.png')no-repeat 100%/100%;height: 300rpx;">
				<view class="f60" style="color: #1ADB95;">
					{{userData.vip?userData.vip.name:''}}
				</view>

				<view class="mt52 f40" style="width: 300rpx;">{{t('mine.t_t9')}}
					{{userData.vip?(userData.vip.rate *100).toFixed(2)+'%':''}}
				</view>
			</view>

			<view class="mt41 between wrap">
				<view class="flex botItem row_center col_center" v-for="item in botList">
					<!-- <image :src="item.img"  mode="widthFix" style="width: 74rpx;height: 74rpx;"></image> -->
					<view class="mglr24">
						<view class="f20 textHidden" style="height: 60rpx;"> {{item.name}}</view>
						<view class="f32 mt20 text_bold text_center" :style="{color:store.$state.contentColor}">
							{{item.value}}
						</view>
					</view>
				</view>
			</view>

			<view class="btns " :style="topStyle" style="margin-top: 200rpx;">
				{{t('mine.t_t4')}} {{pageData.rest_task}}
			</view>



			<view class="btns mt28" v-if="pageData.buttonStatus ==0" :style="choStyle" @click="getTask">
				{{t('mine.t_t5')}}
			</view>
			<view class="btns mt28" v-if="pageData.buttonStatus ==1" :style="noStyle" @click="changePage('./record')">
				{{t('mine.t_t6')}}
			</view>
			<view class="btns mt28" v-if="pageData.buttonStatus ==2" :style="noStyle" @click="showToast">
				{{t('mine.t_t7')}}
			</view>
			<view class="btns mt28" v-if="pageData.buttonStatus ==3" :style="noStyle">
				{{t('mine.t_t8')}}
			</view>
			<!-- 按钮状态 0.可以获取任务 1.有待完成任务 2.推荐下一级vip  3.任务已全部完成,请明天再来 -->
			<!--v-model:visible="showMask" -->
			<nut-overlay v-model:visible="showMask" :close-on-click-overlay="false" v-if="maskData.goods">
				<view class="wrapper">

					<view>
						<view class="content">
							<view class="text_center pt20 f40">
								{{maskData.status == 0?'payment successful':maskData.status == 2?'payment failed':''}}
								<!-- //状态 0.成功 2.支付失败，余额不足 -->
							</view>
							<view class=" recordItem f24">

								<view class="colorF mt17">
									{{t('record.r_r6')}} : {{maskData.order_no}}
								</view>
								<view class="flex mt24 ">
									<view class="imgBg center">

										<image :src="maskData.goods.pic" mode="scaleToFill"
											style="width: 100%;height: 100%;border-radius: 20rpx; border: 2rpx solid #AFAFAF;">
										</image>

									</view>

									<view class="mglr27 flex flex-col "
										style="align-content: space-around; width: 65%;">
										<view class="textHidden" style="height: 60rpx;">{{maskData.goods.name}} </view>
										<view class="between" style="margin-top: 50rpx;">
											<view> {{maskData.order_price}} {{currency}}</view>
											<view>×1</view>
										</view>
									</view>
								</view>

								<view class=" mt30 between">
									<view class="">
										{{t('record.r_r7')}}
									</view>
									<view class="">
										{{(maskData.rate *100).toFixed(2) +'%'}}
									</view>
								</view>
								<view class=" mt30 between">
									<view class="">
										{{t('record.r_r8')}}
									</view>
									<view class="f30" :style="{color:'#1ADB95'}">
										{{maskData.commission}} {{currency}}
									</view>
								</view>
								<!-- v-if="maskData.status == 2"  -->
								<view class=" mt30 maskBtns f30" v-if="maskData.status == 2"
									:style="{background:store.$state.contentColor}" @click="changePage('./recharge')">
									{{t('tabbar.t_t4')}}
								</view>
							</view>
							<view class="closeBtn" @click="closeHandle"
								:style="maskData.status == 2?{bottom:'-280rpx'}:''">
								<image src="../../static/closeBtn.png" mode="widthFix"
									style="width: 70rpx;height: 70rpx;">
								</image>
							</view>
						</view>
					</view>

				</view>
			</nut-overlay>
			<view style="height: 50rpx;"></view>
			<Loading ref="showLoading"></Loading>
		</view>

		<view>
			<nut-overlay v-model:visible="showInviteMask" >
				<view class="wrapper ">
					<view>
						<view style="background-color: #fff;margin-top: 400rpx;border-radius: 20rpx;" class="">
							<view class="pdtb40 pdlr30 f44 text_center text_bold" style="line-height: 50rpx;">Share your
								link to upgrade VIP to earn commission</view>

							<view class="btns" :style="{background:store.$state.contentColor}"
								style="border-radius: 0 0 20rpx 20rpx;" @click="goShare('../mine/share')">
								{{t('all.a_c1')}}
							</view>

						</view>
					</view>

				</view>
			</nut-overlay>
		</view>
		<Tabbar :activeIndex="1"/>
	</view>
</template>

<script setup>
	import {request} from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import Tabbar from '@/components/tabbar.vue'
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


	const showLoading = ref(null)
	const choStyle = {
		background: store.$state.contentColor,
		color: '#000'
	}

	const noStyle = {
		background: '#314539',
		color: '#ddd',
		// border: '1rpx solid #1ADB95',
		'box-shadow': 'none'
	}

	const topStyle = {
		background: '#314539',
		color: '#1ADB95',
		'box-shadow': 'none'
	}

	const botList = ref([{
			name: t('mine.m_t4'),
			img: store.$state.task.t1,
			value: '$ 0.00'
		},
		{
			name: t('wr.w_a2'),
			img: store.$state.task.t2,
			value: '$ 0.00'
		},
		{
			name: t('mine.t_t1'),
			img: store.$state.task.t3,
			value: '$ 0.00'
		},
		{
			name: t('mine.t_t2'),
			img: store.$state.task.t4,
			value: ' 0'
		},
	])
	// 　const { t } = useI18n()
	const userData = ref({})
	const pageData = ref({})
	const getData = () => {
		request({
			url: 'task/index',
			methods: 'get',
		}).then(res => {
			userData.value = res.user
			botList.value[0].value = res.user.balance + " " + currency.value
			botList.value[1].value = res.user.job_balance + " " + currency.value
			botList.value[2].value = res.user.total_commission + " " + currency.value
			botList.value[3].value = res.user.deal_count
			pageData.value = res


		})
	}
	const changePage = (url) => {

		if (showMask.value) {
			showMask.value = false
		}
		uni.reLaunch({
			url
		})
	}
	
	const goShare = (url)=>{
		uni.navigateTo({
			url
		})
	}
	const getTask = () => {
		if (pageData.value.order) {
			return false
		}
		showLoading.value.loading = true
		setTimeout(() => {
			getTask1()
		}, 2000)
	}
	const getTask1 = () => {

		// 领取任务
		request({
			url: 'task/grab',
			methods: 'post',
		}).then(res => {
			try {
				maskData.value.goods.pic = ""
			} catch (e) {
				//TODO handle the exception
			}
			showLoading.value.loading = false
			maskData.value = res.order
			maskData.value.status = res.status
			// maskData.value.status = 2
			showMask.value = true
		}).catch(err => {
			showLoading.value.loading = false
			Toast.text(err.message)
		})
	}
	const showMask = ref(false)
	const currency = ref("")
	let maskData = ref({})

	const showInviteMask = ref(false)
	const showToast = () => {
		showInviteMask.value = true
		// Toast.text('Share your link to upgrade VIP to earn commission')
		// 
	}
	const closeHandle = () => {
		showMask.value = false
		getData()
	}
	// 收益列表
	const commsionText = ref("")
	const getList = () => {
		request({
			url: 'home/taskProfit',
			methods: 'get'
		}).then(res => {
			let str = ""
			for (let i = 0; i < res.length; i++) {
				str += res[i].phone + " " + t('mine.t_t3') + " " + res[i].amount + currency.value + ";"
			}
			commsionText.value = str
		})
	}
	// 终于可以用了
	onShow(() => {
		getData();

	})
	onLoad(() => {
		currency.value = uni.getStorageSync('currency')
		getList()
	})
</script>

<style lang="scss">
	.notice {
		padding: 10rpx 0;
		background-color: #fff;
		border-radius: 20rpx;
		margin-top: 34rpx;
		font-size: 28rpx;
		box-shadow: 0px 1px 51px 0px rgba(64, 46, 197, 0.05);
	}



	.botItem {
		background-color: #314539;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		width: 40%;
		position: relative;
		padding: 53rpx 21rpx;
		color: #fff;

		.img {
			position: absolute;
			left: 20rpx;
			bottom: 20rpx;
		}
	}

	.btns {
		height: 120rpx;
		line-height: 120rpx;
		text-align: center;
		border-radius: 80rpx;

	}

	.maskBtns {
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		border-radius: 20rpx;
		color: #000;
	}

	.wrapper {
		display: flex;
		height: 100%;
		padding: 0 30rpx;

		.content {
			margin-top: 200rpx;
			min-height: 450rpx;
			width: 100%;
			// background: #fff;
			border-radius: 8px;
			position: relative;
			background-color: #314539;
			color: #fff;
		}

		.closeBtn {
			position: absolute;
			bottom: -130rpx;
			right: 50%;
			transform: translateX(50%);
		}
	}

	.recordItem {
		border-radius: 20rpx;
		padding: 26rpx 25rpx;
		color: #fff;
		// border: 1rpx solid #1ADB95;

		.imgBg {
			width: 160rpx;
			height: 160rpx;
			border-radius: 20rpx;
		}
	}

	.textHidden {
		-webkit-line-clamp: 2;
	}
</style>
