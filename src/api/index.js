import request from "@/utils/request.js";
// 获取首页轮播图
export const getSwiper = () => request.get('home/swiperdata');
// 获取首页导航
export const getCat = () => request.get("home/catitems")
// 获得首页楼层
export const getFloor = () => request.get('home/floordata')
// 分类页
export const getCategory = () => request.get("categories")
// 商品列表
export const getGoodsList = (obj) => request.get("goods/search", obj)
//搜素页
export const getSearchData = (obj) => request.get('goods/search', obj)
// 根据微信用户信息换取 token 的登录接口
export const getToken = (obj) => request.post("users/wxlogin", obj)
// 以下接口需要 登录后才能访问
export const orderCreate = obj => request.auth("my/orders/create", obj);
export const orderPay = obj => request.auth("orders/req_unifiedorder", obj);
export const orderCheck = obj => request.auth("my/orders/chkOrder", obj);
export const orderAll = obj => request.auth.get("my/orders/all", obj);

