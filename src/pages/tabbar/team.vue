<template>
	<view class="teamPage indexPage">
		
		<view class="colorfff f40 text_bold center" style="height:100rpx">
			<view class="textUpper">{{ $t('x.a12') }}</view>
		</view>
		<view class="pdlr25  botContent">
			<image src="../../static/team/teamTop.png" mode="widthFix" style="width: 100%;"></image>
			<!-- <view class="f48 text_bold colorfff">{{t('x.t1')}} </view> -->
			<!-- <view class="topSearch">
				<view class="flex mt40" v-if="!pages.start">
					<view class="sel btns" @click="isVisible =true">
						{{t('mine.m_a2')}}
						<image class="mglr17" :src="store.$state.imgObj.down" mode="widthFix"
							style="width: 21rpx; height: 13rpx;"></image>
					</view>
					<view class="sea btns mglr22" @click="searchHandle">
						<image class="mr17" :src="store.$state.imgObj.search" mode="widthFix"
							style="width: 31rpx; height: 30rpx;"></image>
						{{t('mine.m_a3')}}
					</view>
				</view>
				<view class="flex mt40" v-else>
					<view class="sel btns ">
						{{pages.start +' - '+ pages.end}}

						<view class="mglr17" @click="clearHandle">
							<nut-icon name="close" size="14"></nut-icon>
						</view>
					</view>
					<view class="sea btns mglr22" @click="searchHandle">
						<image class="mr17" :src="store.$state.imgObj.search" mode="widthFix"
							style="width: 31rpx; height: 30rpx;"></image>
						{{t('mine.m_a3')}}
					</view>
				</view>
			</view> -->

			<view class="mt30 teamTopPort">
				<view class="bgWhiteBox">
					<view  class="gridItem" v-for="item in teamPortData">
						<view class="title center">
							{{item.name}}
						</view>
						<view class=" value  mt5">{{item.value}}</view>
					</view>
				</view>
			</view>
			
			<view class="mt40">
				<view class="teamDataItem" v-for="(item,index) in teamDataList ">
					<view class="teamTitle">{{item.name}} </view>
					<view class="teamContent">
						<view class="between">
							<view>
								{{t('x.t2')}} {{item.invitation}}% 
							</view>
							<view>
								{{item.invitation_rebate}}
							</view>
						</view>
						<view class="between">
							<view>
								{{t('x.t3')}} {{item.task}}% 
							</view>
							<view>
								{{item.task_rebate}}
							</view>
						</view>
						<view class="between">
							<view>
								{{t('x.t4')}}
							</view>
							<view class="flex col_center" @click="changePage('../mine/team?level='+(index+1))">
								{{item.size}} 
								<image src="../../static/team/right.png" class="ml20" mode="widthFix" style="width: 40rpx;"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		<view class="linkBox">
			<view class="text_center title">
				{{t('x.t5')}}		
			</view>
			<view class="mt30 codeListBoxEl">
				<view v-for="item in inviteCode" class="center">
					{{item}}
				</view>
			</view>
			<view class="center mt30">
				
				<view class="copyBtn  flex " @click="copyHandle(inviteCode)">
					<view style="line-height: 120rpx;">
						<image src="/static/team/linkIcon.png" mode="widthFix" style="width: 50rpx;"></image>
					</view>
					<view class="ml10  text_bold">
						{{t('x.t6')}}
					</view>
				</view>
			</view>
		</view>
		</view>
		
	
		<!-- 选择器 -->
		<!-- 日历 -->
		<nut-calendar v-model:visible="isVisible" type="range" @choose="setChooseValue" start-date="2025-10-01">
		</nut-calendar>
		<Tabbar :activeIndex="2" />
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
	import useClipboard from 'vue-clipboard3'
	import {
		onShow,
		onLoad
	} from "@dcloudio/uni-app";
	const {
		toClipboard
	} = useClipboard()
	const store = userStore();
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();
	const pages = ref({
		page: 1,
		size: 10,
		level: 0,
		start: "",
		end: ""
	})
	const isVisible = ref(false)
	const clearHandle = () => {
		pages.value.start = ""
		pages.value.end = ""
	}
	const searchHandle = () => {
		const data = Object.assign(pages.value)
		getRecord(data)
	}
	const setChooseValue = param => {
		pages.value.start = param[0][3]
		pages.value.end = param[1][3]
	};
	const changePage = url=>{
		uni.navigateTo({
			url
		})
	}
	const inviteCode  = ref("")
	const inviteLink = ref("")
	const copyHandle = async (data) => {
		try {
			await toClipboard(inviteLink.value)
			Toast.text(t('all.a_d1') + " " + t('all.a_c9'))
		} catch (e) {
			console.error(e)
		}
	}
	const teamPortData = ref([
		{
			name:t('x.t7'),
			value:0
		},
		{
			name:t('x.t8'),
			value:0
		},
		{
			name:t('x.t9'),
			value:0
		},
		{
			name:t('x.t10'),
			value:0
		},
		{
			name:t('x.t11'),
			value:0
		},
		{
			name:t('x.t12'),
			value:0
		},
	])
	const teamDataList = ref([
		
	])

	const getRecord = (data) => {
	request({
		url:'user/record/team/report'
	}).then(res=>{
		inviteCode.value = res.invite_code
		inviteLink.value  =res.invite_link
		const  A_level = {
			name:t('x.t13'),
			...res.team_a
		}
		const  B_level = {
			name:t('x.t14'),
			...res.team_b
		}
		const  C_level = {
			name:t('x.t15'),
			...res.team_c
		}
		teamDataList.value = []
		teamDataList.value.push(A_level)
		teamDataList.value.push(B_level)
		teamDataList.value.push(C_level)
		teamPortData.value[0].value = res.member_cate_commission
		teamPortData.value[1].value = res.member_cate_commission_today
		teamPortData.value[2].value = res.level_recharge_today
		teamPortData.value[3].value = res.zhitui
		teamPortData.value[4].value = res.level2
		teamPortData.value[5].value = res.level3
	})
	}
	onLoad(() => {
		getRecord()
	})
</script>

<style lang="scss" scoped>
	.linkBox{
		background: url('/static/team/linkBox.png') no-repeat;
		background-size: contain;
		height: 470rpx;
		margin-top: 50rpx;
		padding-top: 30rpx;
		.codeListBoxEl{
			display: grid;
			grid-template-columns: repeat(6,1fr);
			gap: 10rpx;
			padding: 0 80rpx;
			view{
				background: #fff;
				border-radius: 10rpx;
				color: #000;
				height: 70rpx;
				font-weight: bold;
				font-size: 38rpx;
				
			}
		}
		.title{
			font-size: 44rpx;
			font-weight: bold;
			color: #610B00;
		}
		.copyBtn{
			text-align: center;
			justify-content: center;
			color: #fff;
			background:url('/static/team/linkBtn.png') no-repeat ;
			background-size: cover;
			height: 120rpx;
			line-height: 100rpx;
			width: 50%;
			font-size: 44rpx;
			background-position: top;
			margin-top: 80rpx;
		}
	}
	.teamDataItem{
		background: #FFFFFF;
		box-shadow: 0px 4px 4px 0px rgba(121,33,33,0.25);
		border-radius: 12px 12px 12px 12px;
		// padding: 20rpx;
		margin-bottom: 30rpx;
		.teamTitle{
			background: linear-gradient( 90deg, #FFB005 0%, #FFE065 100%);
			border-radius: 12px 12px 0px 0px;
			padding: 20rpx;
			color: #fff;
			font-size: 34rpx;
			font-weight: bold;
		}
		.teamContent{
			padding: 0  20rpx;
			.between:not(:last-child){
				border-bottom: 1px solid #D2DFE3;
			}
			.between{
				padding: 25rpx 0;
			}
		}
	}
	.teamTopPort{
		// background: linear-gradient( 180deg, #FFE863 0%, #FF9A35 100%);
		background: url('/static/team/teamRe.png') no-repeat ;
		// background-size: contain;
		margin-top: 50rpx;
		padding: 100rpx  30rpx  60rpx;
		
		.bgWhiteBox{
			display: grid;
			grid-template-columns: repeat(3,1fr);
			place-items: center;
			gap: 16rpx;
			// background: #fff;
			border-radius: 20rpx;
			padding: 10rpx ;
		}
		.gridItem{
			// height: 60rpx;
			text-align: center;
			font-size: 26rpx;
			color:#4B2300 ;
			.title{
				height:60rpx;
				line-height: 30rpx;
			}
			.value{
				color:#FB5A0E ;
				font-weight: bold;
				font-size: 28rpx;
			}
		}
	}
	.btns {
		// width: 220rpx;
		height: 80rpx;
		border-radius: 20rpx;

		color: #fff;
		font-size: 24rpx;
		padding: 0 30rpx;
		min-width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sea {
		background: linear-gradient(270deg, #B20100 0%, #E7201F 100%);

	}

	.sel {
		background: #fff;
		color: #000;

	}

	// .teamPage {
	// 	background: url('/static/team/teamBg.png') no-repeat;
	// 	background-size: contain;
	// 	background-position: top;
	// 	min-height: 100vh;
	// 	background-color: #FFE0D7;
	// }
</style>