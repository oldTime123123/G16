<template>
	<!-- -text="t('record.r_r1')" :loading-more-no-more-text -->
	<view :style="store.$state.imgObj.loginBg">
		<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{ t('x.task1') }}
			<view style="width: 50rpx;" class="center">
				<image src="/static/task/taskRec-.png" mode="widthFix" style="width: 50rpx;"
					@click="changePage('../tabbar/task')"></image>
			</view>
		</view>
		<view class=" ">
			<z-paging class="" ref="paging" v-model="taskList" @query="getData" width="100%" :refresher-enabled="false"
				:to-bottom-loading-more-enabled="true" :auto-full-height="true" :auto-show-back-to-top="true"
				:empty-view-text="t('record.r_r1')" :loading-more-no-more-text="t('record.r_r1')"
				:empty-view-reload-text="t('record.r_r2')" :loading-more-loading-text="t('record.r_r4')"
				:loading-more-fail-text="t('record.r_r3')">

				<view class=" pdlr35 recordContent ">
					<view class="taskItem flex  mb30" v-for="item in taskList">

						<view class="">
							<image :src="item.pic" class="bbo10" style="width:240rpx ;height: 240rpx;"></image>
						</view>
						<view class="ml20 flex1">
							<view class="textHidden color3 " style="height: 70rpx;">{{ item.name }} </view>
							<view class="mt5 flex listNameT between">
								<view class=" textHiddenOne" v-if="item.vip_name">{{ item.vip_name }}</view>
								<view class=" ml10 textHiddenOne" v-if="item.vip_title"> {{ item.vip_title }}</view>
							</view>
							<view class="mt5 colorC f26 between">
								<view>{{ t('x.ta1') }}</view>
								<view>{{ currency + item.price }}</view>
							</view>
							<view class="mt5 between">
								<view class="color3 f26">{{ t('x.ta2') }}</view>
								<view class="mainTextColor  text_bold">
									{{ currency + item.commission }}
								</view>
							</view>
							<view class="between">
								<view></view>
								<view>
									<image src="../../static/task/t_r-.png" mode="widthFix"
										style="width: 50rpx;height: 50rpx;" @click="reciveTaskHandle(item)"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</z-paging>
		</view>
		<Loading ref="showLoading"></Loading>
	</view>
</template>

<script setup>
import { request } from '../../../comm/request.ts';
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

const showLoading = ref("")
const reciveTaskHandle = (item) => {
	showLoading.value.loading = true
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
	}).finally(() => {
		showLoading.value.loading = false
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

.recordContent {
	margin-top: 160rpx;

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

		.tag1 {
			padding: 3rpx 10rpx;
			background: linear-gradient(90deg, #FF9036 0%, #FFC72D 100%);
			border-radius: 4px 4px 4px 4px;
			color: #fff;
			font-size: 26rpx;
		}

		.tag2 {
			color: #FF7C35;
			border: 1px solid #FF7C35;
			border-radius: 4px;
			padding: 3rpx 5rpx;
			font-size: 24rpx;
		}
	}

	.listNameT {
		background: url('../../static/task/nameT-.png') no-repeat;
		height: 50rpx;
		background-size: cover;
		line-height: 50rpx;
		padding: 0 20rpx;
		color: #fff;
		font-size: 28rpx;
	}
}
</style>