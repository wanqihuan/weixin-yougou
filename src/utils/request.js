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
request.auth = function (url, data) {
  return request(request.baseURL + url, "POST", data,header);
};
// 导出request
export default request
