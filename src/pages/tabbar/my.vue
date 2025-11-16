<template>
	<view class="myPage">
	
		<view class="colorfff f40 text_bold center" style="height:100rpx">
			<view class="textUpper">{{ $t('x.a10') }}</view>
		</view>
		<view class="pdlr25 pt33">
			<!-- head -->
			<view class="flex userInfoBox mt20">
				<view class="center">
					<image src="/static/themeNum1/my/b_i.png" mode="widthFix" style="width: 120rpx;height: 120rpx;">
					</image>
				</view>
				<view class=" ml20" style="font-weight: normal;">
					<view class=" f40 text_bold phone">
						{{pageData.phone}}
					</view>
					<view class="f26  flex col_center">
						{{t('act.m_m1')}}: <text class="pl10">{{pageData.invite_code}}</text>
						<image class="mglr10" :src="store.$state.my.copy" mode="widthFix"
							style="width: 42rpx;height: 42rpx;" @click="copyHandle(pageData.invite_code)"></image>
					</view>
				
					<view class="flex">
						<view class="mt5 timeBoxEl  flex col_center value" v-if="pageData.vip_unlock_rebate_time">
							<image src="../../static/themeNum1/my/time.png" mode="widthFix"
								style="width: 40rpx; height: 40rpx;"></image> {{pageData.vip_unlock_rebate_time}}
						</view>
					</view>
				</view>
			</view>

			<!-- box -->
			<view class="mt20 bBox">
				<view class="gridBox">
					<view class="botItem">
						<view class="mainTextColor">{{userProfitData.total_commission}}</view>
						<view>{{ t('x.m1')}}</view>
					</view>
					<view class="botItem">
						<view class="mainTextColor">{{userProfitData.balance}}</view>
						<view>{{t('mine.m_t4')}}</view>
					</view>
					<view class="botItem">
						<view class="mainTextColor">{{userProfitData.total}}</view>
						<view>{{ t('x.m2')}}</view>
					</view>
					
					<view class="botItem">
						<view class="mainTextColor">{{userProfitData.today}}</view>
						<view class="title">{{ t('x.m3')}}</view>
					</view>
					
					<view class="botItem">
						<view class="mainTextColor">{{userProfitData.yesterday}}</view>
						<view class="title">{{ t('x.m4')}}</view>
					</view>
					<view class="botItem">
						<view class="mainTextColor">{{userProfitData.week}}</view>
						<view class="title">{{ t('x.m5')}}</view>
					</view>
			
				</view>
			
			</view>

			<view class="mt10 myEl">
				<view class="myItem text_center" v-for="(item,index) in myList"
					@click="changePage(item.url,item.openLink,item)" v-show="item.showFlag">
					<view class="itemEl">
						<view style="height: 100rpx;">
							<image :src="item.img" mode="widthFix" style="width: 100rpx;height: 100rpx;"></image>
						</view>
						<view class="mt12   f22 " style="flex: 1;">{{item.name}}</view>
					</view>

				</view>
			</view>
		</view>

		<div class="drag-boundary"></div>

		<!-- 客服列表 -->
		<nut-drag :boundary="{ top:50, left: 30, bottom:50, right: 30 }" :attract="true" v-if="showService"
			:style="{ top: '300px', right: '30px' }">
			<image :src="store.$state.imgObj.kefuIcon" mode="widthFix" style="width: 80rpx;height: 80rpx;margin-top: 0;"
				@click="changePage('../mine/service')"></image>
		</nut-drag>
		<nut-drag :boundary="{ top:50, left: 30, bottom:50, right: 30 }" :attract="true"
			:style="{ top: '400px', right: '0' }">
			<view class="rightIcon" v-if="showSign || showDraw || showEgg || showHong">
				<view class="" @tap.stop="showAllAct = false" v-if="showAllAct">
					<image class="actItem " src="/static/actIcon/actALL.png" mode="widthFix"
						style="width: 80rpx;height: 80rpx;margin-top: 0;"></image>
				</view>
				<view v-else class="openBg">
					<nut-icon name="close" class="closeIcon" color="#ccc" size="15" @click="showAllAct = true">
					</nut-icon>
					<image class="actItem" v-if="showSign" src="/static/actIcon/signICon.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;margin-top: 20rpx;" @click="changePage('../mine/sign')">
					</image>
					<image class="actItem" v-if="showDraw" src="/static/actIcon/draw.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;" @click="changePage('../mine/rollingDraw')"></image>

					<image class="actItem" src="/static/actIcon/egg.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;" v-if="showEgg"
						@click="changePage('../mine/eggAct?id='+eggId)">
					</image>
					<image class="actItem" src="/static/actIcon/hongbao.png" mode="widthFix"
						style="width: 65rpx;height: 65rpx;" v-if="showHong" @click="changePage('../mine/redEnvList')">
					</image>
				</view>
			</view>
		</nut-drag>

		<Tabbar :activeIndex="4" />

		<nut-overlay v-model:visible="loginOutMask">
			<div class="confirmPopWarper">
				<div class="content ">
					<view class="f40">{{t('x.m6')}}</view>
					<view class="f30 mt40">

						{{t('mine.m_m13')}}
					</view>

					<view class="between">
						<view class="cancelBtn">{{ t('all.a_c2')}}</view>
						<view class="confirmBtn" @click="confirmHandle"> {{t('all.a_c1')}}
						</view>
					</view>
				</div>
			</div>
		</nut-overlay>
		<!-- v-if="showAllAct v-if="showSign"" -->
	</view>
</template>

<script setup>
	import {
		request
	} from '../../../comm/request.ts';
	import {
		userStore
	} from "@/store/themeNum.js";
	import useClipboard from 'vue-clipboard3'
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import Tabbar from '@/components/tabbar.vue'
	const store = userStore();
	const {
		toClipboard
	} = useClipboard()
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const showBadge = ref(false)
	const showAllAct = ref(true)
	const showSign = ref(false)
	const showDraw = ref(false)
	const showHong = ref(false)
	const showEgg = ref(false)
	const eggId = ref(0)
	const getAct = () => {
		// 获取签到
		request({
			url: 'activity/status',
			methods: 'get',
		}).then(res => {
			try {
				res.lottery.status == 1 ? showDraw.value = true : ''
				res.signIn.status == 1 ? showSign.value = true : ''
				res.prizePackage.status == 1 ? showHong.value = true : ''
				res.goldenEgg.status == 1 ? showEgg.value = true : ''
				eggId.value = res.goldenEgg.id
			} catch (e) {
				//TODO handle the exception
			}
		})
	}

	const boxItem = ref([{
			name: t('mine.m_m1'),
			value: '-',
			img: store.$state.my.boxItem[0]
		},
		{
			name: t('mine.m_m2'),
			value: '-',
			img: store.$state.my.boxItem[1]
		},
		{
			name: t('mine.m_m3'),
			value: '-',
			img: store.$state.my.boxItem[2]
		},
	])
	// myList
	const myList = ref([

		{
			name: t('mine.m_m5'),
			img: store.$state.my.myList[0],
			url: '../mine/accountDetails',
			openLink: false,
			showFlag: true,
		},
		{
			name: t('wr.r_r1'),
			img: store.$state.my.myList[1],
			url: '../tabbar/recharge',
			openLink: false,
			showFlag: true,
		},
		{
			name: t('wr.w_a1'),
			img: store.$state.my.myList[2],
			url: '../mine/withdraw',
			openLink: false,
			showFlag: true,
		},

		{
			name: t('x.m7'),
			img: store.$state.my.myList[3],
			url: '../setting/setUp',
			openLink: false,
			showFlag: true,
		},

		{
			name: t('x.m8'),
			img: store.$state.my.myList[4],
			url: '../setting/set3',
			openLink: false,
			showFlag: true,
		},
		{
			name: t('x.m9'),
			img: store.$state.my.myList[5],
			url: '../setting/set4',
			openLink: false,
			showFlag: true,
		},


		{
			name: t('add1.a_d1') + " APP",
			img: store.$state.my.myList[6],
			url: 'down',
			openLink: true,
			showFlag: false,
			// url:"https://www.binance.com/en"
		},
{
			name: 'Setting',
			img: store.$state.my.myList[7],
			url: '../setting/setUp',
			openLink: false,
			showFlag: true,
			// url:"https://www.binance.com/en"
		},
		{
			name: t('x.m10'),
			img: store.$state.my.myList[8],
			url: 'logout',
			openLink: false,
			showFlag: true,
		},

	])


	const loginOutMask = ref(false)
	const changePage = (url, flag) => {
		
		if (flag) {
			window.open('https://land.rtshops.com')
			// window.open(url)
			return false
		} else {
			if (url == 'logout') {
				loginOutMask.value = true
				return
			}
			console.log(url);
			uni.navigateTo({
				url
			})
		}
	}

	const confirmHandle = () => {
		localStorage.removeItem('token')
		uni.navigateTo({
			url: '../login/login'
		})
	}

	const showService = ref(false)

	const copyHandle = async (data) => {
		try {
			await toClipboard(data)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const goRecharge = (url) => {
		uni.navigateTo({
			url: './recharge'
		})
	}
	const userProfitData = ref({})
	const pageData = ref({})
	const getData = () => {

		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {

			res.status == 1 ? showService.value = true : showService.value = false
		})
		request({
			url: 'user/index',
			methods: 'get',
		}).then(res => {
			pageData.value = res
		})
		request({
			url: 'user/record/team/teamBenefits'
		}).then(res => {
			userProfitData.value = res
		})
		// 获取app状态
		request({
			url: 'setting/app',
			methods: 'get',
		}).then(res => {
			if (res.download_status == 1) {
				myList.value.forEach(item => {
					if (item.url == 'down') {
						item.showFlag = true
						item.url = res.url
					}
				})
			}
		})
		// 获取app状态
		request({
			url: 'user/unreadNoticeNum',
			methods: 'get',
		}).then(res => {
			res > 0 ? showBadge.value = true : showBadge.value = false
		})

	}
	const currency = ref("")
	// 终于可以用了
	onShow(() => {
		currency.value = uni.getStorageSync("currency")
		getData()
		getAct()
	})
</script>

<style lang="scss" scoped>
	.myPage {
		background-image: url('/static/themeNum1/my/myPage.png?v1');
		// background: url('/static/vip/bk.png') no-repeat;
		background-repeat: no-repeat;
		background-size: contain;
		min-height: 100vh;
		background-position: top;

		.userInfoBox {
			padding: 40rpx 30rpx;
			color: #974F10;
			.timeBoxEl{
				background: rgba(255,255,255,0.7);
				border-radius: 8px 8px 8px 8px;
				padding: 5rpx 10rpx;
				font-size: 24rpx;
			}
			.phone {
				color: #4B2300;
			}

			.value {
				color: #FB5A0E;
			}
		}
	}

	.colorC {
		color: #919191;
	}

	.bBox {
		// height: 389rpx;
		// height: 320rpx;
		margin-top: 60rpx;
		height: 420rpx;
		background: url('/static/themeNum1/my/balanceBox.png?12') no-repeat;
		background-size: contain;
		padding: 40rpx 10rpx;

		.gridBox {
			margin-top: 80rpx;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			text-align: center;
			gap: 20rpx 10rpx;

		}
		.botItem{
			background: radial-gradient( 26% 26% at 40% 91%, #FEFDF7 0%, #FEEAC5 49%, #FEF9DE 100%);
			box-shadow: 0px 4px 4px 0px rgba(121,33,33,0.25);
			border-radius: 12px 12px 12px 12px;
			font-size: 24rpx;
			color: #4B2300;
			// padding: 20rpx 0;
			height: 150rpx;
			// border: 1px solid;
			// border-image: linear-gradient(141deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)) 1 1;
		}
		.mainTextColor {
			color: #FB5A0E;
			font-weight: bold;
			font-size: 34rpx;
			height: 70rpx;
			line-height: 70rpx;
		}

		}


	.myEl {
		background-image: url('/static/themeNum1/my/botTop.png');
		background-repeat: no-repeat;
		background-size: contain;
		background-color: #fff;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
		padding: 10rpx 20rpx;
		display: grid;
		grid-template-columns: repeat(3,1fr);
		place-items: center;
		gap: 20rpx;
		.myItem {
			padding: 20rpx 0;
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #4B2300;
		}
	}



	.rightIcon {
		position: relative;
		top: 40%;
		right: 30rpx;
		display: flex;
		align-items: center;
		flex-direction: column;

		image {
			margin-top: 50rpx;
		}
	}

	.openBg {
		background-color: rgba(25, 25, 25, 0.3);
		padding: 0 30rpx 30rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-content: space-between;
		position: relative;
		overflow: hidden;
		right: 50rpx;

		.closeIcon {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
		}

	}

	.actItem {
		animation: fadeInDown;
		/* referring directly to the animation's @keyframe declaration */
		animation-duration: 1s;
	}
</style>