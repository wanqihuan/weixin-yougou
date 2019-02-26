// 对wx.request方法进行封装
// 用Promise进行封装
function request(url, method = "GET", data = {}, header = {}) {
  return new Promise((resolve, rejects) => {
    wx.request({
      url,
      method,
      data,
      header,
      success: res=> {
          resolve(res)
      }
    })
  })
}
//  = "https://www.zhengzhicheng.cn/api/public/v1/";
request.baseURL= "https://autumnfish.cn/wx/api/public/v1/";

// request.baseURL="https://itjustfun.cn/api/public/v1/"
request.get = function (url, data) {
  return request(request.baseURL + url, "GET", data);
};
request.post = function (url, data) {
  return request(request.baseURL + url, "POST", data);
};
// 封装带token的请求方式
request.auth = function (url, data) {
  // 获取本地token
  const token= wx.getStorageSync('token');
  if (token) {
    // 如果有请求带上token值
    return request(request.baseURL + url, "POST", data,{
      Authorization: token
    });
  } else {
    // 如果没有跳转到授权页
    wx.navigateTo({ url: '/pages/auth/main' });
    // 如果不返回 Promise 对象，在调用 request.auth 后再使用 then 就会报错
    return new Promise(() => {});
  }
};
// 封装带 token 的请求方法
request.auth.get = function (url, data) {
  // 授权请求第一步，先获取本地 token
  const token = wx.getStorageSync("token");
  // 如果有 token
  if (token) {
    // 在请求头带上 token 信息
    return request(request.baseURL + url, "GET", data, {
      Authorization: token
    });
  } else {
    // 如果没有 token ，跳转到授权页面，授权获取
    wx.navigateTo({ url: "/pages/auth/main" });
    // 如果不返回 Promise 对象，在调用 request.auth 后再使用 then 就会报错
    return new Promise(() => { });
  }
};
// 导出request
export default request
