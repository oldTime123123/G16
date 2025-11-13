<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{t('x.a12')}}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33">

			<view class=" selBot " :style="{background:store.$state.contentColor}">
				{{t('mine.m_t1')}}: <text @click="memberShow = true" class="text_bold"
					style="color: #000;">{{memberValue.text}}</text>
			</view>

			<z-paging class="mt24 " ref="paging" v-model="botList" @query="getRecord" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
				:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
				:loading-more-fail-text="t('record.r_r3')" style="margin: 250rpx auto 0;width: 100%;  " :auto="false">

				<view class=" botEl pdlr30">
					<view class="botItem" v-for="item in botList">
						<view class="between">
							<view>{{t('mine.m_t2')}}</view>
							<view>{{item.filter_phone}}</view>
						</view>
						<view class="between mt16">
							<view>{{t('mine.m_t3')}}</view>
							<view>{{item.child}}</view>
						</view>
						<view class="between mt16">
							<view>{{t('mine.m_t6')}}</view>
							<view>{{item.total_commission}}</view>
						</view>
						<view class="between mt16">
							<view>{{t('mine.m_t4')}}</view>
							<view>{{item.balance}}</view>
						</view>
						<view class="between mt16">
							<view>{{t('mine.m_t5')}}</view>
							<view>{{item.create_time}}</view>
						</view>
					</view>

				</view>
			</z-paging>
		</view>



		<!-- 选择器 -->
		<nut-picker v-model:visible="memberShow" :columns="columns" @confirm="confirm">
		</nut-picker>

		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
	import {request} from '../../../comm/request.ts';

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

	const {
		t
	} = useI18n();
	const showLoading = ref(null)
	const methods = {
		back() {
			history.back()
		},

	};
	const isVisible = ref(false)
	const memberShow = ref(false)
	const memberValue = ref({
		text: t('mine.m_t7'),
		value: 0
	})

	const closeSwitch = param => {
		isVisible.value = false;
	};
	const setChooseValue = param => {
		pages.value.start = param[0][3]
		pages.value.end = param[1][3]
	};
	const confirm = ({
		selectedValue,
		selectedOptions
	}) => {
		// desc.value = selectedValue.join(',');
		memberValue.value = selectedOptions[0]
		showLoading.value.loading = true
		pages.value.page = 1
		pages.value.level = selectedOptions[0].value
		getRecord()
	}

	const columns = [{
			text: t('mine.m_t7'),
			value: 0
		},
		{
			text: '1 ' + t('mine.m_t8'),
			value: 1
		},
		{
			text: '2 ' + t('mine.m_t8'),
			value: 2
		},
		{
			text: '3 ' + t('mine.m_t8'),
			value: 3
		},
	]


	const pages = ref({
		page: 1,
		size: 10,
		level: 0,
		start: "",
		end: ""
	})
	const paging = ref("")
	const hasMore = ref(true)
	const botList = ref([])
	const getRecord = () => {
		request({
			url: 'user/record/team/user',
			methods: 'get',
			data: {
				...pages.value
			}
		}).then(res => {
			showLoading.value.loading = false
			paging.value.complete(res.data);
			pages.value.page += 1

		})
	}
	const clearHandle = () => {
		pages.value.start = ""
		pages.value.end = ""
	}
	onLoad(e=>{
		if(e.level){
			pages.value.level = e.level
			memberValue.value = columns[e.level]
				getRecord(pages.value)
		}
	})
	// // 终于可以用了
	// onShow(() => {
	// 	getRecord(pages.value)
	// })
</script>

<style lang="scss">
	.btns {
		// width: 220rpx;
		height: 80rpx;
		border-radius: 40rpx;

		color: #fff;
		font-size: 26rpx;
		padding: 0 30rpx;
		min-width: 160rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.sea {
		background: #F5B04C;

	}

	.sel {
		background: #3477E0;

	}

	.topEl {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		// grid-template-rows: repeat(3, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		background-color: #314539;
		border-radius: 30rpx;
		padding: 27rpx 20rpx;
		color: #fff;

		.topItem {
			padding: 47rpx 0;
			text-align: center;
			position: relative;

			// .askIcon{
			// 	position: absolute;
			// 	right: 20rpx;
			// 	bottom: 20rpx;
			// }
			view:nth-child(1) {
				height: 80%;
			}
		}
	}

	.selBot {
		padding: 21rpx 31rpx;
		color: #fff;
		display: inline-block;
		border-radius: 30rpx;
		font-size: 26rpx;
	}

	.botItem {
		padding: 35rpx;
		background-color: #fff;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		font-size: 28rpx;
		color: #000;
	}



	.line {
		width: 44rpx;
		height: 2rpx;
		background-color: #999999;
	}

	.wrapper {
		display: flex;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 0 30rpx;

	}
</style>