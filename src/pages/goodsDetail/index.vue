<template>
  <div class="detail">
    <swiper indicator-dots autoplay circular class="swiper">
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item.pics_big_url" class="slide-image"></image>
        </swiper-item>
      </block>
    </swiper>
    <view class="info">
      <view class="price">￥{{price}}</view>
      <view class="name">
        <view class="goods_name">{{name}}</view>
        <view class="collect">收藏</view>
      </view>
      <view class="express">快递:　免运费 </view>
    </view>
    <view class="footer">
      <view class="footer_left">
        <view>联系客服</view>
        <view>购物车</view>
      </view>
      <view class="footer_right">
         <view class="cart">加入购物车</view>
         <view class="buy">立即购买</view>
       </view>
    </view>
  </div>
</template>

<script>
// import card from '@/components/card'
import request from "@/utils/request";

export default {
  data() {
    return {
      goods_id: 0,
      price:'',
      name:'',
      imgUrls:[]
    };
  },

  components: {
    // card
  },

  methods: {},
  onLoad: function(query) {
    console.log(query);
    // 获取参数
    this.goods_id = query.goods_id;
    // 获取商品详情数据
    request.get("goods/detail", { goods_id: this.goods_id }).then(res => {
      console.log(res);
       let goodsData=res.data.message
       console.log(goodsData);
       this.imgUrls=goodsData.pics
       this.price=goodsData.goods_price
       this.name=goodsData.goods_name
    });
  },
  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.detail{
  background-color: #fff;
   .swiper {
    height: 800rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .info{
    box-sizing: border-box;
    padding: 20rpx;
    padding-bottom:100rpx;
     .price{
       padding: 20rpx 0;
       font-size: 36rpx;
       color: #eb4450;
     }
     .name{
       display: flex;
       padding: 20rpx 0;
       .goods_name{
         flex: 1;
         font-size: 32rpx;
         padding-right:30rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
       }
       .collect{
         width: 200rpx;
         display: flex;
       justify-content: center;
       align-items: center;
         font-size: 30rpx;
         color: #ccc;
         border-left: 1px solid #f4f4f4;
       }
     }
     .express{
       padding: 2rpx 0;
       color: #ccc;
       font-size: 34rpx;
     }

  }
    .footer{
       height: 100rpx;
       display: flex;
       position: fixed;
       width: 100%;
       bottom: 0;
       left: 0;
       .footer_left{
         font-size: 30rpx;
        flex: 2;
        display: flex;
        justify-content: space-around;
        align-items: center;
       }
       .footer_right{
         font-size: 36rpx;
         color: #fff;
         flex: 3;
         display: flex;
         .cart{
           flex: 1;
           text-align: center;
           line-height: 100rpx;
           background-color: #f4b73f;
         }
         .buy{
            flex: 1;
           text-align: center;
           line-height: 100rpx;
           background-color: #eb4450;
         }
       }
    }
}
</style>

