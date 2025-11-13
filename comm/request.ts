// request.ts
const WEB_URL = import.meta.env.VITE_API_BASE;
const activeRequests = new Map<string, UniApp.RequestTask>();

const generateReqKey = () => `req_${Date.now()}_${Math.random()}`;

export function cancelAllRequests() {
  if (activeRequests.size === 0) {
    return;
  }
  for (const [key, task] of activeRequests.entries()) {
    task.abort(); // 取消请求
  }
  activeRequests.clear(); // 清空 Map
}

interface RequestOptions extends UniApp.RequestOptions {
  // 添加自定义属性
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE"; // 建议使用明确的 method 类型
  data?: any;
  header?: any;
  cancelOnNavigate?: boolean; // 新增：是否在页面跳转时取消，默认为 true
}

export function request(options: RequestOptions) {
  const shouldTrackRequest = options.cancelOnNavigate !== false;

  const reqKey = generateReqKey();
  return new Promise(async (resolve, reject) => {
    let task: UniApp.RequestTask | null = null;

    const lang = uni.getStorageSync("lang");
    const token = uni.getStorageSync("token");

    task = uni.request({
      ...options,
      url: WEB_URL + options.url,
      method: options.methods || "GET",
      header: {
        lang: lang || "en",
        authorization: token,
        ...options.header,
      },
      success(res: any) {
        // 你的业务逻辑不变
        const { code, data, message } = res.data;
        if (res.statusCode === 200) {
          if (code === 1000) {
            resolve(data);
          } else {
            reject({ message, code });
          }
        } else {
          // 其他状态码处理
          if (
            (res.data.code === 2000 && res.statusCode == 401) ||
            res.statusCode === 401
          ) {
            uni.navigateTo({ url: "/pages/login/login" });
          }
          reject({ message: res.message, data: res.data });
        }
      },
      fail(err) {
        if (err.errMsg && err.errMsg.includes("abort")) {
         
        } else {
          reject({ message: err.errMsg });
        }
      },
      complete() {
        if (shouldTrackRequest) {
          activeRequests.delete(reqKey);
        }
      },
    });

    if (shouldTrackRequest) {
      activeRequests.set(reqKey, task);
    }
  });
}
