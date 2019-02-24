<template>
  <div class="detail">
    <swiper indicator-dots autoplay circular class="swiper">
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item.pics_big_url" class="slide-image" @tap="getBigImg(item.pics_big_url)"></image>
        </swiper-item>
      </block>
    </swiper>
    <view class="info">
      <view class="price">￥{{price}}</view>
      <view class="name">
        <view class="goods_name">{{name}}</view>
        <view class="collect">
          <span class="iconfont icon-shoucang"></span>
        收藏</view>
      </view>
      <view class="express">快递:　免运费 </view>
      <view>
          <view>商品详情</view>
          <view class="detail_content">
             <rich-text type="node" :nodes="goods_introduce" class="goods_introduce"></rich-text>
          </view>

      </view>

      <!-- <rich-text v-html="" class="goods_introduce"></text> -->
    </view>
    <view class="footer">
      <view class="footer_left">
        <view class="service">
        <button open-type="contact" class="btn">客服</button>
          <span class="iconfont icon-kefu"></span>
            客服
        </view>
        <view class="cart">
        <span class="iconfont icon-gouwuche"></span>
        购物车</view>
      </view>
      <view class="footer_right">
         <view class="add_cart">加入购物车</view>
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
      goods_introduce:'',
      imgUrls:[]
    };
  },

  components: {
    // card
  },
  methods: {
    // 大图预览
    getBigImg(url){
      let urls=[]
      this.imgUrls.forEach(e => {
       urls.push(e.pics_big_url)
      });
      console.log(urls);
      wx.previewImage({
       current: url, // 当前显示图片的http链接
       urls:urls // 需要预览的图片http链接列表
})
    }
  },
  onLoad: function(query) {
    // 加载数据提示
     wx.showLoading({
       title: "加载中"
      });
    // 获取参数
    this.goods_id = query.goods_id;
    // 获取商品详情数据
    request.get("goods/detail", { goods_id: this.goods_id }).then(res => {
      // console.log(res);
       let goodsData=res.data.message
       console.log(goodsData);
       this.imgUrls=goodsData.pics
       this.price=goodsData.goods_price
       this.name=goodsData.goods_name
       this.goods_introduce=goodsData.goods_introduce
        // 数据完成后加载提示隐藏
        wx.hideLoading();
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
         flex-direction: column;
          align-items: center;
          justify-content: space-around;
         font-size: 30rpx;
         color: #ccc;
         border-left: 1px solid #f4f4f4;
       }
     }
     .express{
       padding: 10rpx 0;
       color: #ccc;
       font-size: 34rpx;
     }

  }
  // 解决图片空隙
  .detail_content{
    font-size: 0;
  }
    .footer{
       height: 100rpx;
       display: flex;
       position: fixed;
       background-color: #fff;
       width: 100%;
       bottom: 0;
       left: 0;
       .footer_left{
         font-size: 30rpx;
        flex: 2;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        .btn{
          position: absolute;
          opacity: 0;
        }
        .service,.cart{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
        }
       }
       .footer_right{
         font-size: 36rpx;
         color: #fff;
         flex: 3;
         display: flex;
         .add_cart{
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

