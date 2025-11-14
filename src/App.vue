<script>
	import pageAnimation from '@/components/yy-PageAnimation';
	import {
		useI18n
	} from "vue-i18n";

	import {
		Locale
	} from '@nutui/nutui';
	import enUS from '@nutui/nutui/dist/packages/locale/lang/en-US';
	import SEOSetting from '../name.js'
	import themeNum1 from '../color/themeNum1.js';
	import {
		userStore
	} from "@/store/themeNum.js";
	import {
		setupH5Watcher
	} from '@/router/watch.js';
	import bus from '@/utils/bus'; // 引入事件总线
	export default {

		mixins: [pageAnimation],
		onLaunch: function() {
			setupH5Watcher();
			Locale.use('en-US', enUS);
		},
		onShow: function() {
			const store = userStore();
			store.setContentColor(themeNum1.contentColor)
			store.setSecondColor(themeNum1.secondColor)
			store.setImgObj(themeNum1.imgObj)
			store.setMy(themeNum1.my)
			store.setWr(themeNum1.wr)
			store.setTask(themeNum1.task)
			SEOSetting()	
			
			
			let locked = false;
			
			const handleH5UrlChange = e => {
			    if (locked || import.meta.env.MODE !== 'production') {
			        return;
			    }
			    locked = true; // 加锁
			    uni.request({
			        url: '/version.json?t=' + Date.now(), 
			        success: res => { 
			            if (res.data && Number(res.data.version) !== Number(__APP_VERSION__)) {
			                window.location.reload();
			            }
			        },
			        fail: err => {
			           
			        },
			        complete: () => {
			           setTimeout(()=>{
						    locked = false;
					   },10000)
			        }
			    });
			};
			bus.on('h5-url-change', handleH5UrlChange);
		},
		onHide: function() {
			// console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	.indexPage {
		background-image: url('/static/themeNum1/index/topBg.png?v1');
		// background: url('/static/vip/bk.png') no-repeat;
		background-repeat: no-repeat;
		background-size: contain;
		min-height: 100vh;
		background-position: top;
	}
	.topNavBar {
		height: 90rpx;
		line-height: 90rpx;
		color: #fff;
		font-size: 38rpx;
		font-weight: bold;
		padding: 0 25rpx;
background: linear-gradient( 90deg, #FF7C35 0%, #FFCD63 100%);
		.topImg {
			width: 50rpx;
		}
	}

	/*每个页面公共css */
	.nut-navbar {
		padding: 0 !important;
	}

	.botBox {
		img {
			width: 100%;
		}
	}

	.text_white {
		color: #fff;
	}

	.maskItem img,
	.mt70 img,
	.mt40 img {
		width: calc(100% - 45rpx) !important;
		max-height: 100% !important;
	}

	page {
		font-family: PingFangSC !important;
		// color: #333;
		background-color: #FFF8F2;
		font-size: 30rpx;
		animation: .3s linear all;
		max-width:430px;
		margin: 0 auto;
	}
	
	.inp {
		padding: 44rpx 49rpx;
		border-radius: 20rpx;
		font-size: 28rpx;
		color: #000;
		background: #fff;
	}

	.mainContentBtn {
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		height: 100rpx;
		border-radius: 20rpx;
		;
		margin-top: 76rpx;
		transition: .3s linear all;
		background: linear-gradient( 270deg, #FFE030 0%, #FF710F 100%);
	}
	.copyBtn{
		background: linear-gradient( 270deg, #FFE030 0%, #FF710F 100%);
		color: #fff;
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 10rpx;
		border-radius:10rpx;
	}
	.mainCancelBtn {
		@extend .mainContentBtn;
		color: #fff;
		background: #ccc;
	}

	.loginInp {
		background: #FFFFFF;
		font-size: 28rpx;
		color: #fff;
		border-bottom: 1px solid #ccc;
		display: flex;
		padding: 30rpx 0;
	}

	.btns {
		transition: .3s linear all;
	}

	.calendar-confirm-btn {
		border-radius: 20rpx !important;
		background: #F5B04C !important;
	}

	.calendar-month-day-active {
		background: #F5B04C !important;

	}

	.calendar-month-day-choose {
		color: #333 !important;
		background: rgb(254, 243, 222) !important;
	}

	.plo {
		color: #afafaf;
		font-weight: normal;
	}

	.pwdEye {
		transform: translateY(-50%);
	}

	.uni-swiper-dot {
		background-color: rgba(255, 255, 255, 0.5) !important;
	}

	.uni-swiper-dot-active {
		background-color: rgb(245, 176, 76) !important;
	}

	.richText {
		background: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		margin-top: 50rpx;
		color: #000;

		img {
			width: 100%;
		}
	}

	.inpSearch {
		top: 0.3125rem;
		left: 0.625rem;
		width: 200rpx;
		height: 2.1875rem;
		border-radius: 1.25rem;
		border: 0.03125rem solid #ccc;
		display: flex;
		align-items: center;
		margin: 0.625rem auto;
		color: #000;
		padding-left: 20rpx;
	}

	.textUpper {
		text-transform: uppercase;
	}

	.fullRichText {
		img {
			width: 100%;
		}
	}
</style>