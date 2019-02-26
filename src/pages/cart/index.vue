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
          <!-- 选择按钮 -->
          <div class="choice-button" @tap.stop="chooseGoods(index)">
            <view class="iconfont icon-xuanze" :class="{'icon-xuanze-fill':item.selected}"></view>
          </div>
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
                  <div class="rect" @tap.stop="calculateHandle(index, -1)">-</div>
                  <div class="number">{{ item.count }}</div>
                  <div class="rect" @tap.stop="calculateHandle(index, 1)">+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </block>
    </div>
    <!-- 结算 -->
    <div class="cart-total">
      <div class="total-button" @tap="choiceAll(allCount == cartLength)">
        <view class="iconfont icon-xuanze" :class="{ 'icon-xuanze-fill' : allCount == cartLength }"></view>全选
      </div>
      <div class="total-center">
        <div class="colorRed">合计:￥{{allPrices }}</div>
      </div>
      <div class="accounts" @tap="accountsHandle">结算({{allCount}})</div>
    </div>
  </div>
</template>

<script>
import { orderCreate } from "@/api";
export default {
  data() {
    return {
      address: {
        userName: "",
        telNumber: "",
        address: ""
      },
      cartList: {},
      cartLength: 0,
      allCount: 0
    };
  },

  components: {},
  onLoad() {
    // 获取用户地址
    this.address = wx.getStorageSync("address") || {};
    // console.log(this.address);
  },
  onShow() {
    // 获取用户加入购物车的数据列表
    this.cartList = wx.getStorageSync("cartList") || {};
    console.log(this.cartList);
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
    // 商品选择按钮
    chooseGoods(index) {
      // console.log(index);
      this.cartList[index].selected = !this.cartList[index].selected;
    },
    // 点击全选
    choiceAll(boolean) {
      //  把选中的状态取反
      for (const key in this.cartList) {
        this.cartList[key].selected = !boolean;
      }
    },
    // 结算
    accountsHandle() {
      // 获取参数
      let data = {
        order_price: this.allPrices,
        consignee_addr: this.address.address,
        goods: []
      };
      for (let key in this.cartList) {
        if (this.cartList[key].selected) {
          data.goods.push({
            goods_id: this.cartList[key].goods_id,
            goods_number: this.cartList[key].count,
            goods_price: this.cartList[key].goods_price
          });
        }
      }
      //  创建订单
      orderCreate(data).then(res => {
        const { order_number } = res.data.message;
        wx.navigateTo({ url: "/pages/pay/main?order_number=" + order_number });
      });
    },
    // 点击加减
    calculateHandle(index, num) {
      console.log(index, num);
      this.cartList[index].count += num;
      // console.log(this.cartList[index].count);
      if (this.cartList[index].count == 0) {
        wx.showModal({
          title: "提示",
          content: "是否删除商品",
          confirmText: "删除",
          confirmColor: "#f86c37",
          success: res => {
            if (res.confirm) {
              //  点击删除时删除列表
              delete this.cartList[index];
              console.log(this.cartList);
              // 把对象转成字符串，在转会对象，处理成一个全新的对象，再赋值给 this.cartList
              this.cartList = JSON.parse(JSON.stringify(this.cartList));
            } else if (res.cancel) {
              // 点击取消时数量从新赋值为1
              this.cartList[index].count = 1;
            }
          }
        });
      }
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

.rect {
  width: 20px;
  text-align: center;
  border: 1px #999 solid;
  line-height: 1.2;
}

.number {
  margin: 0 10px;
}

.cart-total {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;

  .total-button {
    // padding-left: 20px;
    display: flex;
    justify-content: center;
    flex: 1;
    icon {
      margin-right: 10px;
    }
  }

  .total-center {
    flex: 1;
    padding: 20rpx;

    .colorRed {
      color: red;
    }

    .price-tips {
      font-size: 14px;
      color: #666;
    }
  }

  .accounts {
    width: 30%;
    height: 100rpx;
    background: red;
    color: #fff;
    line-height: 100rpx;
    text-align: center;
  }
}
</style>


