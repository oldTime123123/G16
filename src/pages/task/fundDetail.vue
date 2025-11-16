<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
				{{t('x.b1')}}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr20 pt33">
	<view class="proItem mgtb30">
				<view class=" f36 text_bold text_center">
					{{proInfo.title}}
				</view>
				<view class="proDetailEl">
					<view class="center">
						<image :src="proInfo.full_cover" style="width: 100%;height: 300rpx;"></image>
					</view>
					<view class="mt20 gridBox">
						<view class="gridItem borderR borderB">
							<view class="label">
								{{t('x.b7')}}
							</view>
							<view class="value">
								{{proInfo.min_num +'~' + proInfo.max_num + currency }}
							</view>
						</view>
						<view class="gridItem borderB">
							<view class="label">
								{{t('x.b8')}}
							</view>
							<view class="value">
								{{proInfo.day}} {{t('x.a7')}}
							</view>
						</view>
						<view class="gridItem borderR borderB">
							<view class="label">
								{{t('x.b9')}}
							</view>
							<view class="value">
								{{proInfo.rate_big}}%
							</view>
						</view>
						<view class="gridItem borderB">
							<view class="label">
								{{t('x.b10')}}
							</view>
							<view class="value">
								{{Number(proInfo.rate_big * proInfo.day).toFixed(2)}}%
							</view>
						</view>
						<view class="gridItem borderR ">
							<view class="label">
								{{t('x.b11')}}
							</view>
							<view class="value">
								{{proInfo.remaining_number}}
							</view>
						</view>
						<view class="gridItem " >
							<view class="label">
								{{t('x.b12')}}
							</view>
							<view class="mgtb10 ">
								<nut-progress style="width: 100%;" :percentage="proInfo.progress" :show-text="false"
									stroke-color="#FFA601" />
							</view>
							<view class="value">
							{{proInfo.progress}}%
							</view>
						</view>
					</view>
					<view class="mt30 ">
						{{t('x.b14')}}
					</view>
					<view class="inpBox">
						<input type="number"   v-model="inpVal" :placeholder="t('x.b15')" />
					</view>
					<view class="mt30 contentBtn"  @click="buyHandle">{{t('x.b13')}}</view>
				</view>
			</view>
		
		
		<view class="richText">
			<view v-html="richText"></view>
		</view>
		
		<view style="height: 100rpx;"></view>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import {
		request
	} from '../../../comm/request.ts';
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
	const showLoading = ref("")
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
	const inpVal = ref("")
	const proInfo = ref({})
	const richText = ref("")
	const getData = () => {
		request({
			url: 'lixibao/info',
			methods: 'get',
			data:{
				id:proId.value
			}
		}).then(res => {
			proInfo.value = res
			richText.value = res.content
		})
	}
	const currency = ref("")
	const proId = ref("")
	
	const buyHandle = ()=>{
		if(inpVal.value <1){
			Toast.text(t('x.b14'))
			return 
		}
		if(Number(proInfo.value.remaining_number) < Number(inpVal.value)){
			Toast.text(t('x.i_d4'))
			return 
		}
		showLoading.value.loading = true
		const data = {
			id:proId.value,
			amount: inpVal.value
		}
		request({
			url: 'lixibao/invest',
			methods: 'post',
			data: data
		}).then(res => {
			getData()
			inpVal.value = ""
			Toast.text(t('mine.m_s14'))
			// getData()
			uni.navigateTo({
				url:'../record/skyPayRecord'
			})
		}).catch(err => {
			Toast.text(err.message)
		}).finally(()=>{
			showLoading.value.loading = false
		})
	}
	// 终于可以用了
	onLoad((e) => {
		if (e.id) {
			proId.value = e.id
		}
		getData()
	})
	onShow(()=>{
		currency.value  = localStorage.getItem('currency')
	})
</script>

<style lang="scss" scoped>
	page {
		font-family: PingFangSC;
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
	.inpBox{
		border: 1px solid #DCDCDC;
		margin-top: 20rpx;
		border-radius: 20rpx;
		input{
			height: 80rpx;
			padding-left: 20rpx;
		}
	}
</style>


