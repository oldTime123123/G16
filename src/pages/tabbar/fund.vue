<template>
	<view class="indexPage">
		<view class="center pt20 colorfff f40 text_bold" style="text-transform: uppercase;">
			{{t('x.b1')}}
		</view>

		<view class="mt20 pdlr20">
			<view class="balanceBox colorfff">
				<view>
					{{t('x.b2')}}
				</view>
				<view class="mt6 f40 text_bold">
					{{pageData.balance}}
				</view>

				<view class="mt50 gridBox3">
					<view>
						<view class="f24">{{t('x.b3')}}</view>
						<view class="f32 mt10 text_bold">{{pageData.lixibao_balance}}</view>
					</view>
					<view>
						<view class="f24">{{t('x.b4')}}</view>
						<view class="f32 mt10 text_bold">{{pageData.lixibao_shouru}}</view>
					</view>
					<view>
						<view class="f24">{{t('x.b5')}}</view>
						<view class="f32 mt10 text_bold">{{pageData.lixibao_shouru_yuji}}</view>
					</view>
				</view>
			</view>
			<view class="mt20 recordEl between" @click="goRecord">
				<view class="flex col_center">
					<image src="../../static/skyPay/r_1.png" mode="widthFix" style="width: 50rpx;height: 50rpx;">
					</image>
					<view class="ml10">
						{{t('x.b6')}}
					</view>
				</view>
				<image src="../../static/skyPay/r_2.png" mode="widthFix" style="width: 50rpx;height: 50rpx;"></image>
			</view>

			<view class="proItem mgtb30" v-for="item in proList">
				<view class=" f36 text_bold text_center">
					{{item.title}}
				</view>
				<view class="proDetailEl">
					<view class="center">
						<image :src="item.full_cover" style="width: 100%;height: 300rpx;"></image>
					</view>
					<view class="mt20 gridBox">
						<view class="gridItem borderR borderB">
							<view class="label">
								{{t('x.b7')}}
							</view>
							<view class="value">
								{{item.min_num +'~' + item.max_num + currency }}
							</view>
						</view>
						<view class="gridItem borderB">
							<view class="label">
								{{t('x.b8')}}
							</view>
							<view class="value">
								{{item.day}} {{t('x.a7')}}
							</view>
						</view>
						<view class="gridItem borderR borderB">
							<view class="label">
								{{t('x.b9')}}
							</view>
							<view class="value">
								{{item.rate_big}}%
							</view>
						</view>
						<view class="gridItem borderB">
							<view class="label">
								{{t('x.b10')}}
							</view>
							<view class="value">
								{{Number(item.rate_big * item.day).toFixed(2)}}%
							</view>
						</view>
						<view class="gridItem borderR ">
							<view class="label">
								{{t('x.b11')}}
							</view>
							<view class="value">
								{{item.remaining_number}}
							</view>
						</view>
						<view class="gridItem " >
							<view class="label">
								{{t('x.b12')}}
							</view>
							<view class="mgtb10 ">
								<nut-progress style="width: 100%;" :percentage="item.progress" :show-text="false"
									stroke-color="#FFA601" />
							</view>
							<view class="value">
							{{item.progress}}%
							</view>
						</view>
					</view>
					
					<view class="mt30 contentBtn" @click="goDetail(item.id)">{{t('x.b13')}}</view>
				</view>
			
			</view>
		
		</view>

		<Tabbar :activeIndex="1" />
	</view>
</template>

<script setup>
	import {
		request
	} from '../../../comm/request.ts';
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
	
	const goRecord = ()=>{
		uni.navigateTo({
			url: '../record/skyPayRecord'
		})
	}
	const pageData = ref({})
	const proList = ref([])
	const getData = ()=>{
		request({
			url: 'lixibao/index',
			methods: 'get'
		}).then(res => {
			pageData.value  = res
			proList.value = res.lixibaos
		})
	}
	const currency = ref("")
	
	const goDetail = id=>{
		uni.navigateTo({
			url:'../task/fundDetail?id='+id
		})
	}
	onShow(()=>{
		currency.value = localStorage.getItem('currency')
		getData()
	})
</script>

<style lang="scss" scoped>
	.balanceBox {
		background: url('../../static/skyPay/topbg.png') no-repeat;
		background-size: contain;
		background-position: center;
		height: 200rpx;
		padding: 100rpx 30rpx;

		.gridBox3 {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			gap: 10rpx;

		}
	}

	.recordEl {
		background: #fff;
		border-radius: 30rpx;
		padding: 10px 20rpx;
		color: #FB5A0E;
	}

	.proItem {
		background: linear-gradient(270deg, #FFFBEB 0%, #FFDF60 100%);
		box-shadow: 0px 4px 4px 0px rgba(142, 66, 0, 0.25);
		border-radius: 16px 16px 16px 16px;
		border: 1px solid #FFFFFF;
		padding: 20rpx 0 0;
		overflow: hidden;

		.proDetailEl {
			margin-top: 30rpx;
			padding: 20rpx;
			background-color: #fff;
			border-radius: 30rpx;
			.gridBox{
				display: grid;
				grid-template-columns: repeat(2,1fr);
				.gridItem{
					padding: 15rpx;
					border-color: #D9D9D9;
					.label{
						color: #878787;
					}
				}
			}
		}
	}
	
</style>