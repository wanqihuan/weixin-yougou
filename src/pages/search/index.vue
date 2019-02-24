<template>
  <view class="serach">
    <div class="page__bd">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input
              type="text"
              class="weui-search-bar__input"
              placeholder="搜索"
              v-model="inputVal"
              confirm-type="done"
              @input="inputTyping"
              @confirm="confirmInput"
            >
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @tap="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
          <label class="weui-search-bar__label" :hidden="inputShowed" @tap="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label>
        </div>
        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @tap="hideInput">取消</div>
      </div>
      <scroll-view class="weui-cells searchbar-result" v-if="inputVal.length > 0">
        <block v-for="(item,index) in goods" :key="index">
          <view url class="weui-cell" hover-class="weui-cell_active" @tap="goToDetail(item.goods_id)">
            <view class="weui-cell__bd">
              <view>{{item.goods_name}}</view>
            </view>
          </view>
        </block>
      </scroll-view>
      <!-- 搜素历史数据 -->
      <view class="history-wrapper" v-show="history.length > 0" :hidden="inputShowed">
        <view class="history-title">历史搜索
          <icon @tap="clearHistory" type="clear" size="14" class="clear"></icon>
        </view>
        <view class="history-list">
          <block v-for="(item,index) in history" :key="index">
            <view class="history-item" @tap="goToList(item)">{{ item }}</view>
          </block>
        </view>
      </view>
    </div>
  </view>
</template>
<script>
// import card from '@/components/card'
import { getSearchData } from "@/api";

export default {
  data() {
    return {
      goods: [],
      pagenum: 1,
      pagesize: 20,
      inputShowed: false,
      inputVal: "",
      history: []
    };
  },

  components: {
    // card
  },
  onShow() {
    //  显示是获取搜素历史数据
    this.history = wx.getStorageSync("history") || [];
  },
  methods: {
    showInput() {
      this.inputShowed = true;
    },
    hideInput() {
      this.inputVal = "";
      this.inputShowed = false;
    },
    clearInput() {
      this.inputVal = "";
    },
    // 跳转到详情页
    goToDetail(id){
     wx.navigateTo({ url: "/pages/goodsDetail/main?goods_id="+id});
    },
    // 跳到列表页
    goToList(name){
       wx.navigateTo({
        url:"/pages/goodsList/main?key="+name
      });
    },
    // 清空历史数据
    clearHistory(){
      this.history = [];
      wx.removeStorageSync('history');
      this.inputShowed=true
    },
    // 手机端完成触发
    // 按下回车键触发
    confirmInput() {
      // console.log(11);
      //把输入框搜素数据先储存起来
      this.history.unshift(this.inputVal);
      //  数组去重
      this.history = [...new Set(this.history)];
      wx.setStorageSync("history", this.history);
    },
    // 输入框搜素
    inputTyping(e) {
      // console.log(e);
      this.inputVal = e.mp.detail.value;
      this.hasMore = true;
      (this.pagenum = 1), (this.pagesize = 20), (this.goods = []);
      this.initData();
    },
    // 封装请求数据函数
    initData() {
      // 如果为false停止请求
      if (!this.hasMore) {
        return;
      }
      // 加载提示
      wx.showLoading({
        title: "加载中"
      });
      getSearchData({
        query: this.inputVal,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        // let { goods } = res.data.data;
        let { goods } = res.data.message;
        this.pagenum += 1;
        this.goods = [...this.goods, ...goods];
        // 数据完成后加载提示隐藏
        wx.hideLoading();
        // 数据加载完上拉刷新隐藏
        wx.stopPullDownRefresh();
        if (goods.length < this.pagesize) {
          //上拉拉全部加载完时显示提示
          this.hasMore = false;
        }
      });
    }
  },
  // 上拉加载更多数据
  onReachBottom() {
    this.initData();
  },
  //下拉刷新
  onPullDownRefresh() {
    this.hasMore = true;
    (this.pagenum = 1), (this.pagesize = 20), (this.goods = []);
    this.initData();
  },
  created() {
    //  let app = getApp()
  }
};
</script>
<style lang="scss" scoped>
.weui-search-bar {
  position: fixed;
  width: 100%;
  z-index: 2;
}
.searchbar-result {
  padding-top: 100rpx;
  margin-top: 0;
  font-size: 14px;
}
.searchbar-result:before {
  display: none;
}
.weui-cell {
  padding: 12px 15px 12px 35px;
}
.history-wrapper{
   padding: 100rpx 10rpx 0 10rpx;
.history-list{
  display: flex;
  flex: wrap;
  .history-item{
     width: 100rpx;
     height: 80rpx;
    display: flex;
    justify-content: center;
    align-items: center;
     background-color: #ccc;
     margin: 10rpx;
   }
}
.history-title{
  position: relative;
  .clear{
 position: absolute;
 right: 20rpx;
 top: 10rpx;
}
}
}
</style>

