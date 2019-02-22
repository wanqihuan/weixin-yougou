<template>
  <view>
    <view class="search">
      <input class="search-input" v-model="query" type="text" focus v-on:input="inputFunc">
      <icon type="search" size="32rpx" class="search-icon"></icon>
    </view>
    <view class="search_nav">
      <block v-for="(item,index) in navs" :key="index">
        <view :class="{active:num==index}" @tap="toggle(index)">{{item}}</view>
      </block>
    </view>
    <block v-for="(item,index) in goods" :key="index">
      <view class="goods_list">
        <view class="goods_list_left">
          <img :src="item.goods_small_logo" alt>
        </view>
        <view class="goods_list_right">
          <view class="goods_name">{{item.goods_name}}</view>
          <view class="goods_price">
            <span>￥</span>
            <span>{{item.goods_price}}.</span>
            <span>00</span>
          </view>
        </view>
      </view>
    </block>
    <view class="loading" v-show="hasMore==false">已全部加载完......</view>
  </view>
</template>
<script>
// import card from '@/components/card'
import request from "@/utils/request";

export default {
  data() {
    return {
      navs: ["综合", "销量", "价格"],
      num: 0,
      // isActive: false,
      query: "",
      pagenum: 1,
      pagesize: 20,
      goods: [],
      hasMore:true
    };
  },

  components: {
    // card
  },
  mounted() {
    this.pagenum = 1,
    this.pagesize = 20,
    this.goods = [];
    this.initData();
  },
  // 获取传过来的参数
  onLoad: function(options) {
    this.query = options.key;
    // console.log(this.query);
  },
  methods: {
    // 点击时切换nav样式
    toggle(index) {
      this.num = index;
    },
    // 封装请求数据函数
    initData() {
      // if(!this.hasMore){
      //   return;
      // }
      // 加载提示
      wx.showLoading({
        title: "加载中"
      });
      request(
        "https://www.zhengzhicheng.cn/api/public/v1/goods/search",
        "GET",
        {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      ).then(res => {
        let { goods } = res.data.message;
        this.pagenum += 1;
        this.goods = [...this.goods, ...goods];
        // 数据完成后隐藏
        wx.hideLoading();
        // 数据加载完上拉刷新隐藏
         wx.stopPullDownRefresh()
        //上拉拉全部加载完时显示提示
        if(goods.length<this.pagesize){
            this.hasMore=false
        }

      });
    },
    // 根据input中的值查询数据
    inputFunc() {
      this.pagenum = 1,
      this.pagesize = 20,
      this.goods = [];
      this.initData();
    }
  },
  // 上拉加载更多数据
  onReachBottom() {
    this.initData();
  },
  //下拉刷新
  onPullDownRefresh(){
     this.pagenum = 1,
     this.pagesize = 20,
     this.goods = [];
     this.initData();
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 20rpx 16rpx;
  background-color: #eee;
  position: fixed;
  box-sizing: border-box;
  width: 100%;
  .search-input {
    padding-left: 60rpx;
    height: 60rpx;
    background-color: #fff;
    border: 1rpx solid #ccc;
    font-size: 30rpx;
  }
  .search-icon {
    position: absolute;
    top: 37rpx;
    left: 30rpx;
  }
}
.search_nav {
  display: flex;
  border-bottom: 1px solid #ccc;
  height: 100rpx;
  justify-content: space-around;
  align-items: center;
  font-size: 32rpx;
  .active {
    color: red;
  }
}
.goods_list {
  display: flex;
  padding: 20rpx;
  border-bottom: 1rpx solid #ccc;
  .goods_list_left {
    width: 250rpx;
    height: 200rpx;
    display: flex;
    justify-content: center;
    img {
      width: 200rpx;
      height: 200rpx;
    }
  }
  .goods_list_right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .goods_name {
      font-size: 32rpx;
      line-height: 44rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .goods_price {
      color: red;
      span {
        &:nth-of-type(odd) {
          font-size: 24rpx;
        }
      }
    }
  }
}
.loading {
  line-height: 80rpx;
  text-align: center;
  padding: 20rpx 0;
  font-size: 30rpx;
  background-color: #f4f4f4;
}
</style>
