<!--
 * @Description: 自定义 悬浮异形 tabbar 
-->
<template>
<view>
	<view class="tqb-tabbar ">
		<view class="tqb-tabbar-body animate__fadeInUp animate__animated" style="animation-duration:.3s">
			<view class="tqb-tabbar-item" v-for="(item, index) in tabBarList" :key="index" :class="index === activeIndex ?'selectItemEl':''"
				@click="switchClick(item, index)">
				<view class="tabbar-item-body">
					<view class="tabbar-item-icon">
						<image :src="index === activeIndex ? item.selectedIconPath : item.iconPath"
							style="width:45rpx; height: 45rpx;"></image>
							<!-- {{item.iconPath}} -->
					</view>
					<view class='tab-bar-text' :class="index === activeIndex ? 'actCho' : ''">{{ item.text }}
					</view>
	
				</view>
	
			</view>
		</view>
	</view>
	<view style="height: 160rpx;"></view>
</view>
</template>

<script>
	import {
		defineComponent
	} from 'vue';
	import {
		ref,
	} from "vue";
	import {
		useI18n
	} from "vue-i18n";
	import {
		Toast
	} from '@nutui/nutui';
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app';
	export default defineComponent({
		props: ["activeIndex"],
		setup(props, {
			emit
		}) {
			const {
				t
			} = useI18n();
			const activeIndex = ref(props.activeIndex)
			const tabBarList = ref([{
					"pagePath": "/pages/tabbar/index",
					"iconPath": "/static/themeNum1/tabbar/t1.png",
					"selectedIconPath": "/static/themeNum1/tabbar/t11.png",
					"text": t('x.a2')
				},
				{
					"pagePath": "/pages/tabbar/fund",
					"iconPath": "/static/themeNum1/tabbar/t2.png",
					"selectedIconPath": "/static/themeNum1/tabbar/t22.png",
					"text": 'Fund'
				},

				{
					"pagePath": "/pages/tabbar/team",
					"iconPath": "/static/themeNum1/tabbar/t3.png",
					"selectedIconPath": "/static/themeNum1/tabbar/t33.png",
					"text": t('x.a12')
				},

				{
					"pagePath": "/pages/tabbar/level",
					"iconPath": "/static/themeNum1/tabbar/t4.png",
					"selectedIconPath": "/static/themeNum1/tabbar/t44.png",
					"text": t('x.a9')
				},
				{
					"pagePath": "/pages/tabbar/my",
					"iconPath": "/static/themeNum1/tabbar/t5.png",
					"selectedIconPath": "/static/themeNum1/tabbar/t55.png",
					"text": t('x.a10')

				}
			])
			const switchClick = (data, index) => {

				if (index == activeIndex.value) {
					return;
				}
				activeIndex.value == index;
				uni.navigateTo({
					url: data.pagePath
				});
			}

			return {
				tabBarList,
				switchClick,
				activeIndex,
			}
		},
	})
</script>


<style lang="scss" scoped>
	.tqb-tabbar-body {
		// border-top: 1px solid #e1e1e1;
		background: #FF9442;
		box-shadow: inset 0px 1px 0px 0px rgba(133,66,27,0.25), 0px -2px 8px 0px rgba(0,0,0,0.25);
		height: 110rpx;
		display: flex;
		position: fixed;
		bottom: -1rpx !important;
		left: 0;
		right: 0;
		margin: 0 auto;
		z-index: 100;
		padding-bottom: 1rpx;
		// padding: 22rpx 0;
		transition: bottom 0s ease-in-out;

		.tqb-tabbar-item {
			flex: 1;
			display: flex;
			justify-content: center;
			text-align: center;
			align-items: center;
			position: relative;
			height: 110rpx;
			// width: 18%;
			.tabbar-item-body {
				width: 60%;
			}

			.tabbar-item-icon {
				display: flex;
				justify-content: center;
				transition: all 0.6s ease;

			}

			.tab-bar-text {
				font-size: 20rpx;
				font-weight: 400;
				margin-top: 10rpx;
				color: #B35900;
				text-transform: capitalize;
			}


			.add-icon {
				// width: 230rpx;
				// height: 230rpx;
				position: relative;
				// 	top: -35rpx;
			}


		}
	}

	.actCho {
		color: #fff !important;
	}

	.redDor {
		position: absolute;
		width: 15rpx;
		height: 15rpx;
		background-color: red;
		border-radius: 50%;
		top: -10rpx;
		right: 30%;
	}

	.selectItemEl{
		position: relative;
		z-index: 99;
		&::after{
			z-index: -1;
			position: absolute;
			display: block;
			content: '';
			width: 100rpx;
			height: 100rpx;
			background: #FF9442;
			top: -15rpx;
			border-radius: 50%;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>