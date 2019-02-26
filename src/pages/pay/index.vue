<template>
  <div>
    <view class="cart-top" @tap="chooseAddress">
      <block v-if="address.userName">
        <view class="user">
          <view>收件人：{{address.userName}}</view>
          <view>{{address.telNumber}}</view>
        </view>
        <view class="address">收件地址:{{address.address}}</view>
      </block>
      <block v-else>
        <view class="add-addresss">新增收货地址 +</view>
      </block>
      <view class="address-border"></view>
    </view>
    <!-- 商品列表 -->
    <view class="list_title">优购生活馆</view>
    <div class="ware-list">
      <block v-for="(item,index) in cartList" :key="index">
        <div class="ware-item" @tap="goToDetail(item.goods_id)">
          <!-- 内容主体 -->
          <div class="ware-content">
            <!-- 主体左图片 -->
            <div class="ware-image">
              <img :src="item.goods_small_logo" alt>
            </div>
            <!-- 主体右信息 -->
            <div class="ware-info">
              <view class="goods_name">{{item.goods_name}}</view>
              <div class="ware-info-btm">
                <!-- 价格 -->
                <div class="ware-price">￥{{item.goods_price}}</div>
                <!-- 计数器 -->
                <div class="calculate">
                  <div class="number">X{{ item.count }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </block>
    </div>
    <!-- 支付按钮 -->
    <view class="footer">
      <view class="allPrices">总价:￥{{allPrices}}</view>
      <view class="payBut" @tap="payOrder">支付订单</view>
    </view>
  </div>
</template>

<script>
import { orderPay } from "@/api";
export default {
  data() {
    return {
      address: {
        userName: "",
        telNumber: "",
        address: ""
      },
      cartList: {},
      order_number: ""
    };
  },

  components: {},
  onLoad(query) {
    // 获取用户地址
    this.address = wx.getStorageSync("address") || {};
    this.order_number = query.order_number;
    // console.log(this.address);
  },
  onShow() {
    // 获取用户加入购物车的数据列表
    this.cartList = wx.getStorageSync("cartList") || {};
    // console.log(this.cartList);
  },
  computed: {
    // 计算总数和总价
    allPrices() {
      let allPrices = 0;
      let allCount = 0;
      let cartList = this.cartList;
      for (const key in cartList) {
        if (cartList[key].selected == true) {
          allPrices += cartList[key].goods_price * cartList[key].count;
          allCount++;
        }
      }
      // Object.keys(this.cartList) 转换为key数组 应用数组length属性
      // 根据length来判断是否全选
      this.cartLength = Object.keys(this.cartList).length;
      this.allCount = allCount;
      return allPrices;
    }
  },
  methods: {
    // 获取用户地址
    chooseAddress() {
      wx.chooseAddress({
        success: res => {
          this.address = {
            userName: res.userName,
            telNumber: res.telNumber,
            address: `${res.provinceName}${res.cityName}${res.countyName}${
              res.detailInfo
            }`
          };
          // 存储用户地址到本地
          wx.setStorageSync("address", this.address);
        }
      });
    },
    // 返回详情页
    goToDetail(id) {
      // console.log(id);
      wx.navigateTo({ url: "/pages/goodsDetail/main?goods_id=" + id });
    },
    // 点击支付
    payOrder() {
      orderPay({ order_number: this.order_number }).then(res => {
              // console.log(res);
              const {wxorder} =res.data.message
              // 支付
         wx.requestPayment({
           ...wxorder,
          success:(res)=> {
            console.log("支付成功");
            //  for (const key in  this.cartList) {
            //   if (this.cartList[key].selected) {
            //    delete this.cartList[key]
            //   }
            // }
            // // 解决数据不能及时更新在页面上
            // this.cartList=JSON.parse(JSON.stringify(this.cartList))
            // wx.setStorageSync('cartList',this.cartList)

          },
          fail:(res)=> {
            console.log("支付失败");
             for (const key in  this.cartList) {
              if (this.cartList[key].selected) {
                   delete this.cartList[key]
              }
            }
            // 解决数据不能及时更新在页面上
            this.cartList=JSON.parse(JSON.stringify(this.cartList))
            wx.setStorageSync('cartList',this.cartList)
          }
        });
      });
    }
  },
  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss">
.cart-top {
  min-height: 180rpx;
  position: relative;
  .user {
    display: flex;
    padding: 20rpx;
    justify-content: space-between;
    position: relative;
    padding-right: 50rpx;

    &:after {
      display: block;
      content: "";
      width: 12px;
      height: 12px;
      border-top: 1px #999 solid;
      border-right: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      margin-top: 6px;
    }
  }

  .address {
    padding: 20rpx;
    padding-top: 0;
  }

  .address-border {
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: red;
  }

  .add-addresss {
    height: 180rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-title {
  padding: 20rpx;
  border-bottom: 1px #eee solid;
  border-top: 10px #eee solid;
}

.ware-list {
  padding-bottom: 100rpx;
}

.icon-xuanze-fill {
  color: #ff2d4a;
}

.ware-item {
  padding: 20rpx;
  padding-bottom: 0;
  display: flex;
  align-items: center;

  .choice-button {
    flex-shrink: 0;
    text-align: center;
    margin-right: 20rpx;
    font-size: 32rpx;
  }
}

.ware-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.ware-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  border-bottom: 1px #eee solid;
  padding-bottom: 20rpx;
}

.ware-image {
  img {
    display: block;
    width: 200rpx;
    height: 200rpx;
  }
}

.ware-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.goods_name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.ware-info-btm {
  display: flex;
  justify-content: space-between;

  .ware-price {
    color: red;
  }
}

.calculate {
  display: flex;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  .allPrices {
    display: flex;
    justify-content: center;
    align-items: center;
    color: red;
    font-size: 46rpx;
  }
  .payBut {
    width: 300rpx;
    color: #fff;
    align-items: center;
    background-color: red;
    display: flex;
    justify-content: center;
  }
}
</style>


