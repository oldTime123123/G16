<template>
	<view :style="store.$state.imgObj.loginBg">
<view class="between topNavBar">
			<image :src="store.$state.imgObj.backIcon" mode="widthFix" style="width: 48rpx;height: 36rpx;"
				@click="methods.back"></image>
			{{t('inp.a_b1')}}
			<view style="width: 50rpx;"></view>
		</view>
		<view class="pdlr35 pt33" :style="{color:store.$state.secondColor}">

			<view class="mt29">
				<view class="pl14">
					USDT-ERC20
				</view>
				<view class="mt34">
					<input class="inp" placeholder-class="plo" :placeholder="t('x.a1')" v-model="formData.address">
				</view>
			</view>
			<!-- 	<view class="mt29 f20 pl14" style="color: #F43D45;">
				reminder:At present, only trc20 addresses are supported,and the
				platform will not be responsible for the drop of orders caused.
			</view> -->


			<!-- 登录按钮 -->
			<view class="mainContentBtn f36"
				:style="showTag?{background:store.$state.contentColor,}:{background:store.$state.btnDis}"
				@click="methods.saveHandle">
				{{ t('inp.i_s1')}}


			</view>
			<view style="height: 50rpx;"></view>
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
		onLoad
	} from "@dcloudio/uni-app";
	const store = userStore();
	import {
		useI18n
	} from 'vue-i18n'

	const {
		t
	} = useI18n()
	const showLoading = ref(null)
	const methods = {
		back() {
			history.back()
		},

		saveHandle() {
			if (!canEdit.value) {
				return false
			}
			showLoading.value.loading = true
			setTimeout(() => {
				methods.saveHandle1()
			}, 2000)
		},
		saveHandle1() {
			request({
				methods: 'post',
				url: 'user/attribute/wallet',
				data: {
					address: formData.value.address,
					type:5
				}
			}).then(res => {
				showLoading.value.loading = false
				Toast.text(t('inp.i_s2'));
				history.back()
			}).catch(err => {
				showLoading.value.loading = false
				Toast.text(err.message);
			})
		},
	};
	const canEdit = ref(false)
	const getData = () => {
		request({
			methods: 'get',
			url: 'user/attribute/wallet',
			data:{
				type:5
			}
		}).then(res => {
			if (res.address) {
				formData.value.address = res.address
				res.u_card_can_edit == 1 ? canEdit.value = true : canEdit.value = false
				
			} else {
				canEdit.value = true
			}
		})
	}

	const formData = ref({
		address: ''
	})
	const showTag = ref(false)
	watch(formData, (newVal, oldVal) => {
		showTag.value = false
		if (!canEdit.value) {
			return false
		}
		if (!formData.value.address) {
			return false
		}

		showTag.value = true
	}, {
		deep: true
	})
	// 终于可以用了
	onShow(() => {
		getData();
	})
</script>

<style lang="scss">
	
</style>
