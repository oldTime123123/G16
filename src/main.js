import {
	createApp
} from "vue";
import App from "./App.vue";
import '@/build/rem';
import '../comm/main.scss';
import i18n from '../lang/index.js'
import pinia from './store/index'
import piniaPersist from 'pinia-plugin-persist';
pinia.use(piniaPersist);
import {
	cancelAllRequests
} from "../comm/request.ts";
// 注意：这种方式将会导入所有组件
import NutUI from "@nutui/nutui";
import '../comm/animate.css';
// import VConsole from 'vconsole';
// // 采用按需加载时  此全局css样式，需要删除
import "@nutui/nutui/dist/style.css";
// const vConsole = new VConsole({
//   theme: 'dark', // 设置主题为暗色
//   maxLogNumber: 500, // 最大日志条数
//   onReady: function() {
//     console.log('vConsole is ready.');
//   },
//   onClearLog: function() {
//     console.log('Log is cleared.');
//   }
// });

const app = createApp(App);
const navigateApis = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
navigateApis.forEach((api) => {
	if (uni && uni.addInterceptor) {
		uni.addInterceptor(api, {
			invoke(args) {
				cancelAllRequests();
				return true;
			},
			fail(err) {
				console.error(`[Interceptor] Navigation to ${args.url} failed:`, err);
			},
		});
	}
});
app.use(i18n).use(pinia).use(NutUI);

// 4. 最后挂载应用
app.mount("#app");