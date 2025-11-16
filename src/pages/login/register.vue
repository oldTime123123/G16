<template>
	<view :style="store.$state.imgObj.loginBg2">
		<view class="pdlr35 pt33">
			<view class="flex between">
				<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
					@click="methods.back"></image>
				<image :src="store.$state.imgObj.langSetting" mode="widthFix" style="width: 70rpx;height: 70rpx;"
					@click="methods.changePage('../mine/langSetting')">
				</image>
			</view>

			<view class="" :style="{color:store.$state.secondColor}">
				
				<!-- 登录 -->
				<view class=" loginBox " style="margin-top: 200rpx;">
					<view class="f50 pt40 text_bold text_center" :style="{color:store.$state.thirdColor}">
						{{t('login.l_r1')}}
					</view>
					<view class="mt80">
						{{t('login.l_l2')}}
					</view>
					<view class="mt34 loginInp">
						<view class="center" @click="openPicker" style="color: #000; ">
							{{country_code.country_code}}
							<view class="ml10 center" style="width: 40rpx;">
								<image src="../../static/themeNum1/icon/downSel.png"
									style="width: 30rpx;height: 20rpx;"></image>
							</view>
						</view>
						<input type="number" class="ml20 flex1" v-model="regisForm.phone" :placeholder="t('login.l_l3')">
						<nut-icon name="Check" size="20" v-if="phoneRegFlag"
							class="phoneCheck animate__animated animate__fadeIn " color="#000"></nut-icon>
					</view>

					<view class="mt38">
						<view class="">
							{{t('login.l_l4')}}
						</view>
						<view class="mt34 passwordInp">
							<input class="loginInp " type="safe-password" password="true" v-model="regisForm.password"
								:placeholder="t('login.l_l5')" v-if="openPwd">
							<input class="loginInp " type="safe-password" v-model="regisForm.password"
								:placeholder="t('login.l_l5')" v-else>


							<image src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
								style="width: 50rpx;height: 50rpx;" @click="methods.openPwdHandle('first')"
								v-if="!openPwd"></image>

							<image src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
								style="width: 50rpx;height: 50rpx;" @click="methods.openPwdHandle('first')" v-else>
							</image>
						</view>
					</view>

					<view class="mt38">
						<view class="">
							{{t('login.l_r2')}}
						</view>
						<view class="mt34  passwordInp">
							<input class="loginInp " type="safe-password" password="true" v-model="regisForm.password2"
								:placeholder="t('login.l_r3')" v-if="openCpwd">
							<input class="loginInp " type="safe-password" v-model="regisForm.password2"
								:placeholder="t('login.l_r3')" v-else>

							<image src="../../static/themeNum1/icon/openEye.png" class="pwdEye"
								style="width: 50rpx;height: 50rpx;" @click="methods.openPwdHandle('second')"
								v-if="!openCpwd"></image>
							<image src="../../static/themeNum1/icon/closeEye.png" class="pwdEye"
								style="width: 50rpx;height: 50rpx;" @click="methods.openPwdHandle('second')" v-else>
							</image>
						</view>
					</view>
					<view class="mt38" v-if="smsFlag" >
						<view class="">
							{{t('login.l_r4')}}
						</view>
						<view class=" loginInp ">
							<input class="" v-model="regisForm.sms_code" :placeholder="t('login.l_r5')">

							<view class="otp" v-if="!hasSend" @click="sendHandle" :style="choStyle">
								OTP
							</view>
							<view class="countdown center" v-else>
								{{hasSecond}}s
							</view>
						</view>
					</view>
					<view class="mt38">
						<view class="">
							{{t('login.l_r6')}}
						</view>
						<view class="mt34">
							<input class="loginInp" v-model="regisForm.invite_code" :placeholder="t('login.l_r7')"
								:disabled="!canInpCode" />
						</view>
					</view>

				
				</view>
				
				<!-- 登录按钮 -->
				<view class="loginBtn center f36" 
					@click="methods.regisHandle(methods.regisHandle1)">
					{{t('login.l_r8')}}
					<image src="/static/themeNum1/right.png" class="ml40" mode="widthFix" style="width: 60rpx;"></image>
				</view>
				<!-- 登录按钮 -->
				<view class="text_center mt34 f26 pb10 " @click="methods.changePage('./login')">
					Already have an account? <text class="pb5" :style="{color:'#FFB310'} "
						style="border-bottom: 2rpx solid ;"> {{t('login.l_l1')}}</text>
				</view>
			</view>
			<view style="height: 50rpx;"></view>

			<!-- 客服列表 -->
			<nut-drag :boundary="{ top:50, left: 30, bottom:50, right: 15 }" :attract="true" v-if="showService"
				:style="{ top: '170rpx', right: '30rpx' }">
				<image :src="store.$state.imgObj.kefuIcon" mode="widthFix"
					style="width: 70rpx;height: 70rpx;margin-top: 0;" @click="methods.changePage('../mine/service')">
				</image>
			</nut-drag>

			<nut-popup position="left" :style="{ width: '40%', height: '100%' }" v-model:visible="showPicker">
				<view class="inpSearch  ">
					<input type="text" v-model="inpSeach" @tap.stop="searchHandle" @input="searchHandle" style="">
					<nut-icon name="search" style="margin-right: 40rpx;" size="20" color="#000"></nut-icon>
				</view>
				<view class="listItem1" v-for="(item,index) in searchCode" :style="index == currentInd?choStyle:''"
					@click="confirm(item,index)">
					{{item.text}} {{item.name}}
				</view>
			</nut-popup>

			<Loading ref="showLoading"></Loading>
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
		onLoad,
		onHide
	} from "@dcloudio/uni-app";
	import {
		watch
	} from 'vue';
	import {
		useI18n
	} from "vue-i18n";

	const {
		t
	} = useI18n();

	const store = userStore();


	const openPwd = ref(true) // 密码可见
	const openCpwd = ref(true) // 第二次密码可见

	// 登录表单
	const regisForm = ref({
		phone: '',
		password: '',
		password2: '',
		invite_code: '',
		sms_code: '',
	})
	
	
const searchCode = ref([])
	const inpSeach = ref("")
	const searchHandle = (e) => {
		if (!countryList.value) {
			return false
		}
		let temArr = []
		countryList.value.forEach(item => {
			if (item.alias.toLowerCase().includes(inpSeach.value.toLowerCase()) || item.country_code
				.toLowerCase().includes(inpSeach.value.toLowerCase())) {
				temArr.push(item)
			} else {
				return false
			}
		})
		searchCode.value = temArr
	}
	const btnDis = ref(false)
	// 　const { t } = useI18n()
	const country_code = ref('')
	const showPicker = ref(false)
	const showService = ref(false)

	const regFlag = ref(false)
	const phoneRegFlag = ref(false)
	// 监听
	watch(regisForm, (newVal, oldVal) => {
		if (country_code.value.preg) {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value = false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}

		if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
			.length > 24 || regisForm.value.password2.length > 24) {
			regFlag.value = false
			return false
		}
		if (regisForm.value.password !== regisForm.value.password2) {
			regFlag.value = false
			return false
		}
		if (smsFlag.value && !regisForm.value.sms_code) {
			regFlag.value = false
			return false
		}
		if (codeFlag.value && !regisForm.value.invite_code) {
			regFlag.value = false
			return false
		}
		regFlag.value = true
	}, {
		deep: true
	})

	const choStyle = {
		background: store.$state.contentColor,
		color: '#fff',
		transition: '.3s linear all'
	}
	const noCho = {
		background: store.$state.btnDis,
		color: '#000',
	}

	const hasSecond = ref(60)
	const hasSend = ref(false)
	const sendHandle = () => {
		let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
		let phoneReg = new RegExp(tempReg);
		if (!phoneReg.test(regisForm.value.phone)) {
			Toast.text(t('login.l_l9'))
			return false
		}

		if (timer.value) {
			clearInterval(timer.value)
		}
		const data = {
			tel: regisForm.value.phone,
			country: country_code.value.text,
			type: 1
		}

		request({
			url: 'join/sms',
			methods: 'post',
			data: data
		}).then(res => {
			startTimer()
			hasSend.value = true
			Toast.text(t('login.l_r9'))
		}).catch(err => {
			Toast.text(err.message)
		})
	}
	const openPicker = () => {
		// if (canChoCountry.value) {
		// }
			showPicker.value = true
	}
	const timer = ref(null)
	const startTimer = () => {
		timer.value = setInterval(() => {
			if (hasSecond.value == 0) {
				clearInterval(timer.value)
				hasSecond.value = 60
				hasSend.value = false
			}
			hasSecond.value--;
		}, 1000)

	}
	const currentInd = ref(0)

	const showLoading = ref(null)

	const confirm = (item, index) => {
		country_code.value = item
		currentInd.value = index
		showPicker.value = false
		regFlag.value = false
		country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
		
		
		if (country_code.value.preg) {
			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				phoneRegFlag.value = false
				regFlag.value =false
				return false
			} else {
				phoneRegFlag.value = true
			}
		}
		
	}
	const methods = {
		back() {
			history.back()
		},
		changePage(url) {
			uni.navigateTo({
				url
			})
		},
		regisHandle(fn) {
			// if(!regFlag.value){
			// 	return false
			// }

			let tempReg = country_code.value.preg.replace('/', '').replace('/', '')
			let phoneReg = new RegExp(tempReg);
			if (!phoneReg.test(regisForm.value.phone)) {
				Toast.text(t('login.l_l9'))

				return false
			}

			if (regisForm.value.password.length < 6 || regisForm.value.password2.length < 6 || regisForm.value.password
				.length > 24 || regisForm.value.password2.length > 24) {
				Toast.text(t('login.l_r14'))
				return false
			}
			if (regisForm.value.password !== regisForm.value.password2) {
				Toast.text(t('login.l_r13'))
				return false
			}
			if (smsFlag.value && !regisForm.value.sms_code) {
				Toast.text(t('login.l_r10'))
				return false
			}
			if (codeFlag.value && !regisForm.value.invite_code) {
				Toast.text(t('login.l_r11'))
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				fn()
			}, 1500)
		},
		regisHandle1() {
			regisForm.value.country_code = country_code.value.text;
			request({
				url: '/join/register',
				methods: 'post',
				data: regisForm.value
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('login.l_r12'))
				
				if(sessionStorage.getItem('link')){
					let key = sessionStorage.getItem('link')
					uni.clearStorage()
					uni.setStorageSync('token', res.accessToken)
					uni.navigateTo({
						url:'../linkEgg/linkEgg?key='+key
					})
					return false
				}
				uni.setStorageSync('token', res.accessToken)
				setTimeout(() => {
					uni.navigateTo({
						url: '../tabbar/index'
					})
				}, 1000)

			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message)
			})

		},
		openPwdHandle(type) {
			if (type == 'second') {
				openCpwd.value = !openCpwd.value
			}
			if (type == 'first') {
				openPwd.value = !openPwd.value
			}
		}

	};

	const smsFlag = ref(false)
	const codeFlag = ref(false)
	const countryList = ref([])
	const getSetting = () => {
		request({
			url: 'setting/register',
			methods: 'get'
		}).then(res => {

			// 邀请码 状态 1.必填 0.选填
			res.registerInviteCode.status == 1 ? codeFlag.value = true : codeFlag.value = false
		})
		if (store.$state.countryCode.length > 0) {
			countryList.value = store.$state.countryCode
			country_code.value = countryList.value[0]

			// /状态 1.开启 0关闭 短信
			country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
			// console.log(country_code.value);
		}
		
			request({
				url: '/setting/country',
				methods: 'get'
			}).then(res => {
				let tempArr = []
				for (let i = 0; i < res.length; i++) {
					res[i].text = res[i].country_code
					res[i].value = res[i].id
					tempArr.push(res[i])
				}
				searchCode.value = tempArr
				store.setCountryCode(tempArr)
				countryList.value = store.$state.countryCode
				if (canChoCountry.value) {
					country_code.value = store.$state.countryCode[0]
				} else {
					store.$state.countryCode.forEach(item => {
						let str = "+" + countryVal.value
						if (item.country_code == str) {
							country_code.value = item
						}
					})
					if (!country_code.value) {
						country_code.value = store.$state.countryCode[0]
					}
				}
				country_code.value.sms_status == 1 ? smsFlag.value = true : smsFlag.value = false
		
			})

		// 获取客服状态
		request({
			url: 'setting/customerService',
			methods: 'get',
		}).then(res => {

			res.status == 1 ? showService.value = true : showService.value = false
		})
	}
	// 终于可以用了
	onShow(() => {
		getSetting()
	})
	onHide(() => {
		if (timer.value) {
			clearInterval(timer.value)
		}
	})
	onLoad(()=>{
		if(!uni.getStorageSync('setLang')){
			request({
				url: 'setting/lang',
				methods: 'get',
			}).then(res => {
				uni.setStorageSync('lang',res[0].lang)
				uni.setStorageSync('setLang',true)
				history.go(0)
			})
		}
	})
	const canInpCode = ref(true)
	const canChoCountry = ref(true)
	const countryVal = ref(0)
	onLoad((e) => {
		if (e.code) {
			regisForm.value.invite_code = e.code
			canInpCode.value = false

		}
		if (e.country) {
			canChoCountry.value = false
			countryVal.value = e.country
		}
	})
</script>

<style lang="scss">
	.loginBtn{
		background: url('../../static/themeNum1/btnBg.png') no-repeat;
		background-size: 100%;
		width: 65%;
		height: 150rpx;
		line-height: 180rpx;
		color: #fff;
		margin-top: -100rpx;
		background-position: top;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.passwordInp {
		position: relative;

		.pwdEye {
			position: absolute;
			// left: 20rpx;
			right: 0;
			top: 50%;
		}
	}

	.loginInp {
		position: relative;

		.otp {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			font-size: 20rpx;
			transform: translateY(-50%);
			width: 80rpx;
			height: 80rpx;
			border-radius: 10rpx;
			color: #fff;
			text-align: center;
			line-height: 80rpx;
		}

		.countdown {
			position: absolute;
			// left: 20rpx;
			right: 40rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 60rpx;
			height: 60rpx;
			border: 1rpx solid #ccc;
			border-radius: 10rpx;
			color: #ccc;
			text-align: center;
			line-height: 60rpx;

		}
	}

	.phoneEl {
		position: relative;
		padding-left: 100rpx;
		// background-color: #fff;
		border-radius: 80rpx;

		.phoneLabel {
			position: absolute;
			left: 40rpx;
			top: 50%;
			font-size: 30rpx;
			transform: translateY(-50%);
		}

		.phoneCheck {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);

		}
	}

	.listItem1 {
		font-size: 30rpx;
		padding: 10rpx 20rpx;
		// margin: 10rpx 0;
		height: 120rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 1rpx solid #eee;
	}

	.actItem {
		color: #fff;
	}
	page{
		background: #e7edea;
	}
</style>
