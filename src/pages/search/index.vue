<template>
  <view>
    <view class="search">
      <input class="search-input" v-model="query" type="text" focus v-on:input="inputFunc()">
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
            <span>{{item.goods_price}}</span>.
            <span>00</span>
          </view>
        </view>
      </view>
    </block>
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
      pagesize: "",
      goods: []
    };
  },

  components: {
    // card
  },
  mounted() {
    request(
      "https://www.zhengzhicheng.cn/api/public/v1/goods/search?query=" +
        this.query +
        ""
    ).then(res => {
      // console.log(res);
      this.goods = res.data.message.goods;
    });
  },
  // 获取传过来的参数
  onLoad: function(options) {
    // console.log(options);
    this.query = options.key;
    // console.log(this.query);
  },
  methods: {
    // 点击时切换nav样式
    toggle(index) {
      this.num = index;
    },
    // 根据input中的值查询数据
    inputFunc() {
        request(
          "https://www.zhengzhicheng.cn/api/public/v1/goods/search?query=" +
            this.query +
            ""
        ).then(res => {
          // console.log(res);
          this.goods = res.data.message.goods;
        });

    }
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
  position: relative;
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
</style>
