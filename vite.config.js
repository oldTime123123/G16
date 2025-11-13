import {
	defineConfig
} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import versionUpdatePlugin from "./src/plugins/versionUpdatePlugin.js";
const Timestamp = String(new Date().getTime());
import { execSync } from 'child_process';

function printBuildInfo() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    console.log(`\n📦 当前构建信息:`);
    console.log(`   - 分支: ${branch}`);
  } catch (e) {
    console.warn('获取 Git 信息失败，可能不在一个 Git 仓库中。');
  }
}

// 立即执行
printBuildInfo();
// 引入等比适配插件
const px2rem = require('postcss-px2rem')

// 配置基本大小
const postcss = px2rem({
	// 基准大小 baseSize，需要和rem.js中相同
	remUnit: 16
})

// https://vitejs.dev/config/
export default defineConfig({
	define: {
		// 定义全局变量
		__APP_VERSION__: Timestamp,
	},
	plugins: [
		uni(),
		AutoImport({
			imports: ['vue', 'vue-router'] //自动导入vue 和vue-router相关的函数 
		}),
		
		versionUpdatePlugin(Timestamp),
	],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			},
		},
	},

	lintOnSave: true,
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					postcss
				]
			}
		}
	}
})
