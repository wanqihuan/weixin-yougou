<template>
  <viwe>
    <viwe class="userInfo">
      <open-data type="userAvatarUrl" class="userImg"></open-data>
      <open-data type="userNickName" class="userName"></open-data>
    </viwe>
    <viwe class="userNav">
      <viwe>收藏的店铺</viwe>
      <viwe>收藏的商品</viwe>
      <viwe>关注的商品</viwe>
      <viwe>我的足迹</viwe>
    </viwe>
    <view class="line"></view>
    <viwe class="order_info">
      <viwe class="my_order">
        <view class="order_title">我的订单</view>
        <view class="order_message">
          <view class="no_payment item">
            <span class="iconfont icon-daifukuan"></span>
            待付款
          </view>
          <view class="no_goods item">
            <span class="iconfont icon-daishouhuo"></span>
            待收货
          </view>
          <view class="no_goods item">
            <span class="iconfont icon-tuikuan"></span>
            退款/退货
          </view>
          <view class="no_goods item">
            <span class="iconfont icon-dingdan"></span>
            全部订单
          </view>
        </view>
      </viwe>
      <view class="line"></view>
      <viwe class="weui-panel__ft">
        <div class="weui-cell weui-cell_access weui-cell_link" @tap="getAddress">
          <div class="weui-cell__bd addr_idea">收货地址管理</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </div>
      </viwe>
      <view class="line"></view>
      <view class="contact" @tap="callSomeOne(1008611)">
        <text>联系客服</text>
        <text>1008611</text>
      </view>
      <viwe class="weui-panel__ft">
        <button open-type="feedback" class="weui-cell weui-cell_access weui-cell_link">
          <div class="weui-cell__bd addr_idea">意见反馈</div>
          <div class="weui-cell__ft weui-cell__ft_in-access"></div>
        </button>
      </viwe>
    </viwe>
  </viwe>
</template>

<script>
// import card from "@/components/card";

export default {
  data() {
    return {};
  },
  onLoad: function(query) {
  },

  components: { },



  methods: {
    // 获取收货地址
    getAddress(){
   wx.chooseAddress({
  success(res) {
    console.log(res.userName)
    console.log(res.postalCode)
    console.log(res.provinceName)
    console.log(res.cityName)
    console.log(res.countyName)
    console.log(res.detailInfo)
    console.log(res.nationalCode)
    console.log(res.telNumber)
  }
})
    },
    callSomeOne(tel) {
      console.log(tel);
      wx.makePhoneCall({
        phoneNumber: "tel" // 仅为示例，并非真实的电话号码
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  display: flex;
  padding: 50rpx;
  flex-direction: column;
  align-items: center;
  background-color: #eb4450;
  .userImg {
    border-radius: 50%;
    width: 100rpx;
    height: 100rpx;
  }
  .userName {
    color: #fff;
    font-size: 30rpx;
  }
}
.userNav {
  padding: 20rpx 0;
  display: flex;
  color: #8b8b8b;
  font-size: 30rpx;
  justify-content: space-around;
}
.line {
  height: 30rpx;
  width: 100%;
  background-color: #f4f4f4;
}
.order_info {
  box-sizing: border-box;
  .my_order {
    .order_title {
      padding: 20rpx;
      border-bottom: 1px solid #ccc;
    }
    .order_message {
      display: flex;
      justify-content: space-around;
      padding-bottom: 30rpx;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 30rpx;
      }
    }
  }
  .contact {
    padding: 10rpx 30rpx;
    display: flex;
    justify-content: space-between;
  }
  button {
    background-color: #fff;
    outline-style: 0;
    text-align: left;
    padding: 0 30rpx;
  }
  .addr_idea {
    color: #000;
    font-size: 36rpx;
  }
  //
}
</style>

