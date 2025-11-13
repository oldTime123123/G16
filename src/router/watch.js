// router/h5Watcher.js
import bus from '@/utils/bus'; // 引入事件总线
// 存储原始的 history.pushState 和 history.replaceState
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;
function getNowVersion(){
	uni.request({
		url:'/version.json',
		success:e=>{
			console.log(e);
		}
	})
}
function setupH5Watcher() {

  // 重写 pushState，以便在程序化导航时也能捕获
  history.pushState = function(state, title, url) {
    originalPushState.apply(this, arguments);
    const newUrl = url || window.location.href;
    bus.emit('h5-url-change', {
      type: 'pushState',
      url: newUrl,
      state: state
    });
    console.log('H5: Intercepted pushState to', newUrl);
  };

  // 重写 replaceState
  history.replaceState = function(state, title, url) {
    originalReplaceState.apply(this, arguments);
    const newUrl = url || window.location.href;
    bus.emit('h5-url-change', {
      type: 'replaceState',
      url: newUrl,
      state: state
    });
    console.log('H5: Intercepted replaceState to', newUrl);
  };

  // 监听 popstate (用户点击前进/后退按钮触发)
  const handlePopState = (event) => {
    bus.emit('h5-url-change', {
      type: 'popstate',
      url: window.location.href,
      state: event.state
    });
    console.log('H5: Intercepted popstate to', window.location.href);
  };
  window.addEventListener('popstate', handlePopState);

  // 监听 hashchange (uni-app H5 默认 hash 模式，hash 变化触发)
  const handleHashChange = (event) => {
    bus.emit('h5-url-change', {
      type: 'hashchange',
      url: window.location.href,
      oldURL: event.oldURL,
      newURL: event.newURL
    });
    console.log('H5: Intercepted hashchange to', window.location.href);
  };
  window.addEventListener('hashchange', handleHashChange);

  // 返回一个 cleanup 函数，用于移除监听器
  return () => {
    window.removeEventListener('popstate', handlePopState);
    window.removeEventListener('hashchange', handleHashChange);
    // 注意：重写的 pushState/replaceState 无法简单地“撤销”
    // 在实际应用中，如果 App.vue 销毁（例如单页应用路由切换），可能需要更复杂的管理
    // 但对于 uni-app 的 App.vue 来说，它通常不会被销毁
    console.log('H5 URL change watcher cleaned up.');
  };
  return () => {}; // 非 H5 环境返回空函数
}

export { setupH5Watcher };