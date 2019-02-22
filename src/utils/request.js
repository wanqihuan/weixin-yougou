// 对wx.request方法进行封装
// 用Promise进行封装
function request(url, method = "GET", data = {}) {
  return new Promise((resolve, rejects) => {
    wx.request({
      url,
      method,
      data,
      success: res=> {
          resolve(res)
      }
    })
  })
}
// 导出request
export default request
