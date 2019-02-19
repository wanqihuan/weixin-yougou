// 对wx.request方法进行封装
// 用Promise进行封装
function request(url, method="GET") {
  return new Promise((resolve, rejects) => {
    wx.request({
      url,
      method,
      success: res=> {
          resolve(res)
      }
    })
  })
}
// 导出request
export default request
