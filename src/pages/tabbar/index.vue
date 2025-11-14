<template>
	<view class="indexPage">
		<view class="topBox">
			<view class="topNav between">
				<image src="/static/themeNum1/index/pd.png?1" mode="widthFix" class="topImg" @click="changePage(1, '/pages/mine/service')"></image>
				<image src="/static/themeNum1/index/title.png" mode="widthFix" style="width: 100rpx;"></image>
				<image src="/static/themeNum1/index/ls.png?1" mode="widthFix" class="topImg"
					@click="changePage(1, '/pages/mine/langSetting')"></image>
			</view>
			<view class="mt20 " style="position: relative;">
				<swiper :indicator-dots="true" :indicator-active-color="store.$state.contentColor" :autoplay="true"
					:interval="3000" :duration="1000" :circular="true" style="height: 340rpx;">
					<swiper-item v-for="(item, index) in list" @click="botHandle(2, item)" :key="index"
						style="width: 100%;margin: 0 10rpx;">
						<image :src="item.banner_image" mode="scaleToFill"
							style="height: 340rpx;border-radius: 20rpx; width: calc(100% - 20rpx);"></image>
					</swiper-item>
				</swiper>

			</view>
		</view>
		<!-- 轮播图 -->

		<view class="pageContent pdlr20 pt23">

			<view class="notice mt30 bbo20" v-if="showBar" dir="ltr">
				<nut-noticebar :text="barText" :left-icon="store.$state.imgObj.labaIcon" :scrollable="true"
					background="transparent" color="#BD5800">
				</nut-noticebar>
			</view>


			<!-- comm -->
			<view class="mt30  lgBoxEl">
				<!-- <view class="commItem" :style="{ 'background-image': `url(${item.full_cover})` }"
					v-for="(item, index) in commListInfo" :key="index" @click="goArtcle(item.id)">
					<view class="commText f22">
						{{ item.name }}
					</view>
				</view> -->

				<view class="lgImg flex col_center" @click="goArtcle(3)">
					<view class="between">
						<view>
							<view class="name">{{t('x.i_d1')}}</view>
							<view class="label mt10">{{t('x.i_d2')}}</view>
						</view>

						<view>
							<image src="/static/themeNum1/icon/i_r.png" mode="widthFix"
								style="width: 60rpx;"></image>
						</view>
					</view>
				</view>
				<view class="lgImg flex col_center" @click="changePage(1,'../mine/notice')">
					<view class="between">
						<view>
							<view class="name">{{t('x.i_d3')}}</view>
							<view class="label mt10">{{t('x.i_d2')}}</view>
						</view>

						<view>
							<image src="/static/themeNum1/icon/i_r.png" mode="widthFix"
								style="width: 60rpx;"></image>
						</view>
					</view>
				</view>
			</view>

			<view class="mt30 commBoxEl">
				<view class="gridItem" v-for="item in commList" @click="openCommList(item)">
					<view>
						<image :src="item.icon" mode="widthFix" style="width: 100rpx;"></image>
					</view>
					<view class="mt5 f24">{{item.name}}</view>
				</view>
			</view>
			<!-- goods -->
			<view class="f40 text_bold secondClo mt40" :style="{ color: store.$state.thirdColor }">
				{{ t('index.i_a1') }}
			</view>
			<view class="mt20">
				<view class="goodsItem" v-for="(item, index) in goodsList" :key="index" @click="goTaskList(item)">
					<view class="flex col_center ">
						<view class="center">
							<image src="/static/vip/vip.png" style="width: 50rpx;height: 50rpx;" class="bbo10"></image>
						</view>
						<view class="ml10 f36 textHiddenOne">
							{{ item.name }}
							
						</view>
					</view>
					<view class="mt40  flex  " style="flex-shrink: 0;">
						<view class="">
							<image :src="item.pic" mode="widthFix" style="width: 160rpx;height: 160rpx;"></image>
							<view class="mt10 text_center">{{item.title}}</view>
						</view>
						<view class="descGridBox ml20 f24 flex1">
							<view class="descItem text_center">
								<view>{{ $t('x.a3') }}</view>
								<view class="mt10 f28 text_bold">{{ item.price + ' ' + currency }}</view>
							</view>
							<view class="descItem text_center">
								<view>{{ $t('x.a4') }}</view>
								<view class="mt10 f28 text_bold">{{ item.day_max }}</view>
							</view>
							<view class="descItem text_center">
								<view>{{ $t('x.a5') }}</view>
								<view class="mt10 f28 text_bold">{{ item.bonus + ' ' + currency }}</view>
							</view>
							<view class="descItem text_center">
								<view> {{ $t('x.a5') + ' ' + item.dayProfit + currency }}.
									{{ $t('x.a6') + ' ' + item.show_day + ' ' + $t('x.a7') }}
								</view>
							</view>
						</view>
					</view>
					<!-- <view class="pt5 pl15">
						<view class="f50" :style="{color:store.$state.thirdColor}">{{item.name}}</view>
						<view class="mt8 f24">
							<view v-for="ite in item.desc">{{ite}}</view>
						</view>
					</view>
					<view>
						<image :src="item.pic" mode="widthFix" style="width: 300rpx;height: 230rpx;"></image>
					</view> -->
					<view class="goodsMask center flex-col"
						:class="!showMask ? 'animate__animated animate__fadeInUp' : ''" v-if="item.is_active == 0">
						<view class="center flex-col "
							:class="!showMask ? ' animate__animated animate__backInDown   ' : ''">
							<image src="../../static/themeNum1/index/locked.png" mode="widthFix"
								style="width: 77rpx;height: 77rpx;"></image>
							<!-- <view class="f40 mt23" style="color: #fff;"> {{t('index.i_a2')}}</view> -->
						</view>
					</view>

					<!-- 	<view class="floatRightInfo center flex col_center">
						<image :src="item.little_pic" mode="widthFix" style="width: 40rpx;"></image>
						<view class="ml20 textHiddenOne">{{ item.name }} <span class="f26">{{ item.title }}</span>
						</view>
					</view> -->
				</view>
			</view>


			<view class="recordBoxContent">
				<view class="pdlr25">
					<view class="gridBox2">
						<view :class="recordActInd == '0' ? 'actRecordW' : ''" @click="recordActInd = 0">{{ t('index.i_a3')
					}}
						</view>
						<view :class="recordActInd == '1' ? 'actRecordR' : ''" @click="recordActInd = 1">Recharge cash
						</view>
					</view>
				</view>

				<view class="pdlr10">
					<view class="recordContent">
						<swiper :circular="true" v-if="recordActInd == '0'" :indicator-dots="false" :autoplay="true"
							:interval="2000" :duration="1000" display-multiple-items="5"
							style=" width: 100% !important;height: 500rpx;" :disable-touch="true" :vertical="true">
							<swiper-item v-for="(item, index) in withdrawList" style="width: 100%;" :key="index">
								<view class="honerItem ">

									<view class=" mglr10 between" style="flex: 1;">
										<text>{{ item.phone }} </text>
										<text>{{ t('index.i_a4') }}</text>
										<text class="value" style="padding-left: 10rpx;">{{ item.amount }}
											{{ currency }}</text>
									</view>

								</view>
							</swiper-item>
						</swiper>

						<swiper v-else :circular="true" :indicator-dots="false" :autoplay="true" :interval="2000"
							:duration="1000" display-multiple-items="5" style=" width: 100% !important;height: 500rpx;"
							:disable-touch="true" :vertical="true">
							<swiper-item v-for="(item, index) in rechargeList" style="width: 100%;" :key="index">
								<view class="honerItem ">
									<view class=" mglr10 between" style="flex: 1;">
										<text>{{ item.phone }} </text>
										<text>{{ $t('x.a8') }}</text>
										<text class="value" style="padding-left: 10rpx;">{{ item.amount }}
											{{ currency }}</text>
									</view>

								</view>
							</swiper-item>
						</swiper>
					</view>


				</view>
				
				<view class="botInfo between">
					<view class="center">
						<image src="/static/themeNum1/index/b_l1.png" mode=" widthFix" style="width: 160rpx;height: 160rpx;"></image>
					</view>
					<view class="center">
						<image src="/static/themeNum1/index/b_l2.png" mode=" widthFix" style="width: 200rpx;height: 70rpx;"></image>
					</view>
					<view class="center">
						<image src="/static/themeNum1/index/b_l3.png" mode=" widthFix" style="width: 160rpx;height: 160rpx;"></image>
					</view>
				</view>
			</view>

		</view>

		<view class="pdlr25">

			<!-- bottom -->
			<view v-if="artclList.length > 0">
				<view class="mt60 secondClo f40" :style="{ color: store.$state.thirdColor }">
					{{ t('index.i_a5') }}
				</view>
				<view class="mt40 bottom ">
					<view v-for="item in artclList" class="center botItem" @click="botHandle(3, item)">
						<image :src="item.full_cover" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
			</view>
			<view style="height: 40rpx;"></view>
		</view>
		<!-- 客服列表 -->
		<nut-drag :boundary="{ top: 50, left: 30, bottom: 50, right: 30 }" :attract="true" v-if="showService"
			:style="{ top: '850rpx', right: '30px' }">
			<image :src="store.$state.imgObj.kefuIcon" mode="widthFix" style="width: 80rpx;height: 80rpx;margin-top: 0;"
				@click="changePage(3, '../mine/service')"></image>
		</nut-drag>

		<FullMask v-show="showMask" @confirm="methods.confirm" :maskList="maskContent"></FullMask>
		<Tabbar :activeIndex="0" />
	</view>
</template>

<script setup>
	import {
		request
	} from '../../../comm/request.ts';
	import FullMask from "@/components/fullMask/fullMask";
	import Tabbar from '@/components/tabbar.vue'
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		userStore
	} from "@/store/themeNum.js";
	import WebsocketTask from '../../../comm/websocket.js'
	// 创建websocket
	// let websocket = new WebsocketTask('xxx', 5000)
	// // 挂载到全局 或者 定义一个全局变量然后进行赋值也可
	// console.log(websocket);
	//页面中调用方法

	// websocket.send(JSON.stringify(data))
	const goFeiJi = () => {
		// window.open(feiji.value)
		window.location.href = feiji.value
	}
	const recordActInd = ref(0)
	const store = userStore();
	const showService = ref(false)
	// 轮播图
	const list = ref([])
	// 滚动消息
	const barText = ref("")
	const showBar = ref(false)
	// wenzhang
	const artclList = ref([])
	// 提现列表
	const withdrawList = ref([])

	const goodsList = ref([])
	// 弹窗
	const showMask = ref(false)
	const maskContent = ref([])
	const changePage = (ind, url) => {
		if (ind == 0) {
			uni.navigateTo({
				url
			})
		} else {
			uni.navigateTo({
				url
			})
		}
	}
	const goArtcle = (id) => {
		uni.navigateTo({
			url: '../mine/article?id=' + id
		})
	}
	const methods = {
		open() {
			showMask.value = false;
		},
		confirm() {
			showMask.value = false;
		},
	}
	const rechargeList = ref([])
	const currency = ref("")
	const commListInfo = ref([])
	const feiji = ref()
	const appUrl = ref("")
	const getData = () => {
		// 货币
		request({
			url: 'setting/currency',
			methods: 'get'
		}).then(res => {
			currency.value = res.currency
			uni.setStorageSync('currency', res.currency)
		})

		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {
			// console.log(res);
			feiji.value = res.list[0]?.contact_link
			res.status == 1 ? showService.value = true : showService.value = false
		})
		// 轮播图
		request({
			url: 'home/banner',
			methods: 'get'
		}).then(res => {
			list.value = res
		})
		request({
			url: 'page/article/listsNew?pos=5',
			methods: 'get'
		}).then(res => {
			commListInfo.value = res
			// console.log(res);
			// list.value = res
		})
		// 公告
		request({
			url: 'home/marquee',
			methods: 'get'
		}).then(res => {
			res.status == 1 ? showBar.value = true : showBar.value = false
			barText.value = res.content
		})
		// 文章
		request({
			url: 'home/article',
			methods: 'get'
		}).then(res => {
			artclList.value = res
		})

		// 弹窗 未完成
		request({
			url: 'home/alert',
			methods: 'get'
		}).then(res => {
			maskContent.value = res
			if (maskContent.value.length > 0) {
				showMask.value = true
			}
		})
// 获取app状态
		request({
			url: 'setting/app',
			methods: 'get',
		}).then(res => {
			if (res.download_status == 1) {
				appUrl.value  = res.url
			}
		})
		// 提现假数据
		request({
			url: 'home/deposit',
			methods: 'get'
		}).then(res => {
			withdrawList.value = res
		})
		// 提现假数据
		request({
			url: 'home/depositRecharge',
			methods: 'get'
		}).then(res => {
			rechargeList.value = res
		})



		request({
			url: 'home/vipListNew',
			methods: 'get'
		}).then(res => {
			goodsList.value = res
		})
	}

	const botHandle = (type, item) => {
		// 轮播图
		if (type == 2) {
			if (item.turn_type == 0) {
				return false
			}
			if (item.turn_type == 2) {
				window.open(item.link)
				return false
			}

			if (item.turn_type == 1) {
				// 文章详情
				uni.navigateTo({
					url: "../mine/article2?id=" + item.article_id
				})
			}

		} else if (type == 3) {
			uni.navigateTo({
				url: "../mine/article2?id=" + item.id
			})
		}
	}

	const commList = ref([{
			name: 'Recharge',
			icon: "/static/themeNum1/index/com1.png",
			url: './recharge'
		},
		{
			name: 'Withdrawal',
			icon: "/static/themeNum1/index/com2.png",
			url: '../mine/withdraw'
		},
		{
			name: 'Salary details',
			icon: "/static/themeNum1/index/com3.png",
			url: '../mine/article?id=2'
		},
		{
			name: 'App download',
			icon: "/static/themeNum1/index/com4.png",
			url: 'down'
		},
	])
	const openCommList = (item) => {
		if (item.url == 'down') {
			// appUrl
			var userAgent = navigator.userAgent; //获取userAgent信息
			if (userAgent.includes('iPhone')) {
				uni.navigateTo({
					url: '../mine/iosIntro'
				})
				return false
			}
			window.open(appUrl.value)
			return
		}

		uni.navigateTo({
			url: item.url
		})
	}
	const goTaskList = (item) => {
		if (item.is_active == 1) {
			uni.navigateTo({
				url: '../task/taskList'
			})
			return
		}
		uni.showModal({
			title: t('x.m6'),
			content: t('x.vip1'),
			confirmText: t('all.a_c1'),
			cancelText: t('all.a_c2'),
			success: e => {
				if (e.confirm) {
					request({
						url: "home/vipUnlock",
						methods: "post",
						data: {
							vipId: item.id
						}
					}).then(res => {
						getData()
					}).catch(err => {
						uni.showToast({
							title: err.message,
							icon: 'none'
						})
					})
				}
			}
		});


	}
	// 终于可以用了
	onLoad((e) => {

		if (e.code) {
			uni.navigateTo({
				url: '../login/register?code=' + e.code
			})
			return false
		}
		if (e.key) {
			uni.navigateTo({
				url: '../linkEgg/linkEgg?key=' + e.key
			})
			return false
		}
		if (!uni.getStorageSync('setLang')) {
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang', res[0].lang)
				uni.setStorageSync('setLang', true)
				history.go(0)
			})
		}

		getData()
	})
</script>

<style lang="scss" scoped>
	.honerItem {
		color: #610B00;


		padding: 10px 0;
		font-size: 28rpx;
		border-bottom: 1px dashed #ccc;

		.value {
			color: #FF7C35;
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.recordBoxContent {
		background: linear-gradient(270deg, #FFE030 0%, #FF710F 100%);
		padding: 20rpx 0 160rpx 0;
		border-radius: 20rpx;
		position: relative;
		.botInfo{
			position: absolute;
			width: 106%;
			left: -4%;
		}
		.recordContent {
			border-radius: 20rpx;
			padding: 20rpx;
			// margin-top: -15px;
			color: #610B00;
			background: #fff;
		}

		.gridBox2 {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			text-align: center;
			border-radius: 20rpx 20rpx 0 0;
			overflow: hidden;
			padding-bottom: 30rpx;
			color: #FFFFFF;

			view {
				height: 60rpx;
				line-height: 60rpx;
				font-size: 32rpx;
			}

			.actRecordW,
			.actRecordR {
				// background: url('/static/vip/rcW.png') no-repeat;
				background: #FFFFFF;
				box-shadow: 0px 4px 4px 0px rgba(249, 37, 0, 0.5);
				border-radius: 17px 17px 17px 17px;
				border: 1px solid #FF5724;
				color: #FB5A0E;
				font-weight: bold;
				font-size: 36rpx;
			}

		}

		.titleHeadBg {
			margin-top: -30rpx;
		}
	}

	.commBoxEl {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		place-items: center;
		text-align: center;
		background: #FFFFFF;
		// box-shadow: 0px 4px 4px 0px rgba(142,66,0,0.25);
		background: linear-gradient(180deg, rgba(251, 105, 27, .5) 0%, rgba(255, 255, 255, 0) 100%);
		border-radius: 16px 16px 16px 16px;
		padding: 20rpx 0;
		color: #4B2300;
	}

	.lgBoxEl {
		.lgImg:nth-child(1) {
			background: url('/static/themeNum1/icon/lg1.png') no-repeat;
			background-size: contain;

		}

		.lgImg:nth-child(2) {
			background: url('/static/themeNum1/icon/lg2.png') no-repeat;
			background-size: contain;
		}

		.lgImg {
			height: 170rpx;
			padding: 0 20rpx 0 200rpx;
			margin-bottom: 30rpx;
			color: #CA3D00;
			font-size: 28rpx;
			.between {
				flex: 1;
			}

			.name {

				color: #A84600;
				font-size: 40rpx;
				font-weight: bold;
			}
		}
	}


	.topBox {
		// background-size: cover;
		width: calc(100% - 60rpx);
		// height: 530rpx;
		padding: 0 30rpx;

		.topNav {
			height: 90rpx;
			line-height: 90rpx;
			color: #fff;
			font-size: 38rpx;
			font-weight: bold;

			.topImg {
				width: 70rpx;
				height: 70rpx;
			}
		}
	}



	.bottom {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.botItem {
			background-color: #fff;
			border-radius: 20rpx;
			width: 48%;
			overflow: hidden;
			height: 166rpx;
			margin-bottom: 30rpx;
		}
	}

	.notice {
		background-color: #FFE6B7 !important;
		font-size: 28rpx;
		border-radius: 50rpx;
		border: 2px solid #FF7837;
	}

	.mt123 {
		margin-top: 100rpx;
	}

	.goodsItem {
		padding: 10rpx 30rpx 50rpx;
		position: relative;
		color: #610B00;
		background: url('/static/vip/vipBg.png?2') no-repeat;
		background-position: top;
		background-size: contain;
		margin-bottom: 40rpx;

		// width:calc( 100% - 50rpx);
		.floatRightInfo {
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			width: 40%;
			color: #fff;
		}

		.descGridBox {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 20rpx;
		}

		.descItem {
			background: #FFF1E8;
			padding: 10rpx;
			height: 80rpx;
			border-radius: 10rpx;

			view:nth-child(1) {
				height: 40rpx;
			}

			.text_bold {
				color: #FB5A0E;
			}
		}

		.goodsMask {
			position: absolute;
			z-index: 10;
			left: 0%;
			top: 0;
			height: 100%;
			width: 100%;
			border-radius: 10rpx;
			background: rgba(0, 0, 0, 0.7);
		}

	}


	.wrapper {
		display: flex;
		height: 100%;
		justify-content: center;
		padding: 0 50rpx;

		.content {
			margin-top: 300rpx;
			display: flex;
			width: 100%;
			background: #fff;
			border-radius: 8px;
			align-items: center;
			height: 600rpx;
			padding: 30rpx;
			position: relative;

			.closeBtn {
				position: absolute;
				bottom: -100rpx;
				left: 0;
				right: 0;
				margin: 0 auto;
			}
		}

		.maskItem {
			// height: 100%;
			height: 100% !important;
			overflow: hidden;
			background-color: aquamarine;

			// display: flex;
			// align-items: center;
			// justify-content: center;
			// overflow: scroll;
			img {
				width: 100% !important;
				height: 100% !important;
			}
		}

	}

</style>