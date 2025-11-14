<template>
	<view class="indexPage">
		<view class="colorfff f40 text_bold center" style="height:100rpx">
			<view class="textUpper">{{ $t('x.a9') }}</view>
		</view>
		<view class="pdlr30"> <!-- goods -->
			<view class="f40 secondClo text_bold " :style="{ color: store.$state.thirdColor }">
				{{ $t('index.i_a1') }}
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
					:class=" 'animate__animated animate__fadeInUp'" v-if="item.is_active == 0">
					<view class="center flex-col "
						:class=" ' animate__animated animate__backInDown   ' ">
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
		</view>



		<Tabbar :activeIndex="3" />
	</view>
</template>

<script setup>
	import {request} from '../../../comm/request.ts';
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
	const store = userStore();
	const goodsList = ref([])
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

		// uni.navigateTo({
		// 	url: '../task/taskList'
		// })
	}
	const getData = () => {
		request({
			url: 'home/vipListNew',
			methods: 'get'
		}).then(res => {
			goodsList.value = res
		})
	}

	const currency = localStorage.getItem('currency')
	// 终于可以用了
	onLoad((e) => {


		getData()
	})
</script>

<style lang="scss" scoped>
	.topNavBar {
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 38rpx;
		font-weight: bold;

		.topImg {
			width: 50rpx;
		}
	}


	.goodsItem {
		padding: 10rpx 30rpx 40rpx;
		position: relative;
		color: #610B00;
		background: url('/static/vip/vipBg.png?1') no-repeat;
		background-position: top;
		background-size: cover;
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
			height: 65rpx;
			border-radius: 10rpx;

			view:nth-child(1) {
				height: 30rpx;
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


</style>