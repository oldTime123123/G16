<template>
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{t('x.task1')}}
			<view style="width: 50rpx;" class="center">
				<image src="/static/task/taskRec.png" mode="widthFix" style="width: 50rpx;"
					@click="changePage('../tabbar/task')"></image>
			</view>
		</view>
		<view class=" ">
			<z-paging class="" ref="paging" v-model="taskList" @query="getData" width="100%" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
				:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
				:loading-more-fail-text="t('record.r_r3')">
				<view class="gridBox pdlr35 ">
					<view class="taskItem" v-for="item in taskList">
						<view class="title between text_center">
							<view>
								{{item.vip_name}}
							</view>
							<view>
								{{item.vip_title}}
							</view>
						</view>
						<view class="center mt15 goodsImg">
							<image :src="item.pic" style="width: 100%;height: 100%;"></image>
						</view>
						<view class="wordContent">
							<view class="textHidden f24 color3">
								{{item.name}}
							</view>
							<!-- <view class="mt5 f24 colorC">
								Price <del>{{currency + item.price}}</del>
							</view> -->
							<view class="mt5 between">
								<view class="f24">
									<view class="color3">{{ t('x.task2') }}</view>
									<view class="mainTextColor text_bold f32 flex" style="align-items: center;">
										<image class="mr5" style="width: 35rpx;height: 35rpx;" src="/static/825.png"
											mode="">
										</image> {{ item.commission}}
									</view>
								</view>
								<view class="center" @click="reciveTaskHandle(item)"
									style="position: relative;z-index: 10;">
									<image src="/static/task/car.png" mode="widthFix" style="width: 50rpx;"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
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
	const changePage = url => {
		uni.navigateTo({
			url
		})
	}
	const paging = ref("")
	const taskList = ref([])
	const pages = ref({
	  page: 1,
	  size: 10,
	  ids: []
	})
	const getData = (page) => {
	
	  request({
	    url: 'task/goods',
	    data: {
	      page: pages.value.page,
	      size: pages.value.size,
	      ids: JSON.stringify(pages.value.ids)
	    }
	  }).then(res => {
	    for (let i = 0; i < res.list.data.length; i++) {
	      pages.value.ids.push(res.list.data[i].id)
	
	    }
	    paging.value.complete(res.list.data);
	    pages.value.page += 1
	  })
	}

	const reciveTaskHandle = (item) => {
		request({
			url: 'task/createConvey',
			methods: "POST",
			data: {
				goods_id: item.id
			}
		}).then(res => {
			Toast.text(t('x.task3'))
			uni.navigateTo({
				url: '../tabbar/task'
			})
		}).catch(e => {
			Toast.text(e.message)
		})
	}
	const currency = localStorage.getItem('currency')
	// 终于可以用了
	onShow(() => {

		// getData();
	})
</script>

<style lang="scss" scoped>
	.topNavBar {
		position: fixed;
		width: calc(100% - 48rpx);
		padding: 0 24rpx;
		z-index: 99;
	}

	.gridBox {
		margin-top: 120rpx;
		display: grid;
		gap: 20rpx;
		grid-template-columns: repeat(2, 1fr);

		.wordContent {
			padding: 10rpx;
		}

		.taskItem::before {
			content: '';
			/* 伪元素必须有 content 属性 */

			/* 关键：绝对定位，并铺满整个父盒子 */
			position: absolute;
			top: -2rpx;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url('/static/task/listTitle.png');
			background-repeat: no-repeat;
			background-size: 110%;
			background-position: top;
			// border-radius: 10rpx 10rpx 0 0;
			z-index: 1;
			border-radius: 10px;
		}

		.taskItem {
			background-color: #fff;
			border-radius: 10rpx;
			position: relative;
			width: 320rpx;
			overflow: hidden;

			.goodsImg {
				width: 320rpx;
				height: 320rpx;
				background-size: 100%;
				z-index: -1;
				margin-top: 50rpx;
			}

			.color3 {
				color: #333;
			}

			.colorC {
				color: #B2B2B2;
			}

			.mainTextColor {
				color: #FF7C35;
			}

			.title {
				height: 60rpx;
				background-size: cover;
				font-size: 24rpx;
				color: #fff;
				text-align: center;
				position: absolute;
				z-index: 10;
				width: 100%;

				view:nth-child(1) {
					width: 60%;
					font-size: 28rpx;
				}

				view:nth-child(2) {
					flex: 1;
				}
			}
		}
	}
</style>