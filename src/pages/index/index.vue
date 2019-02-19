<template>
  <div class="home">
    <div class="search">
      <div class="search-input">
         <icon type='search' size='32rpx' class="search-icon"></icon>　搜素
      </div>
    </div>
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" >
      <block v-for="(item, index) in imgUrl" :key="index">
        <swiper-item>
          <image :src="item.image_src" class="slide-image" ></image>
        </swiper-item>
      </block>
    </swiper>
    <!-- 导航栏 -->
    <ul class="nav_list">
      <li v-for="(item,index) in menus" :key="index">
          <img :src="item.image_src" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
import card from "@/components/card";
export default {
  data() {
    return {
      imgUrl:[],
       menus:[]

    }
  },
  mounted () {
   let that=this;
 wx.request({
  url: 'https://itjustfun.cn/api/public/v1/home/swiperdata',
  success(res){
    // console.log(res)
    // 这是因为this作用域指向问题 ，success函数实际是一个闭包 ， 无法直接通过this来imgUrl
    that.imgUrl=res.data.data
  }
  }),
  // 导航栏
  wx.request({
    url:'https://itjustfun.cn/api/public/v1/home/catitems',
    // 箭头函数 
    success:(res)=>{
      console.log(res);
      this.menus=res.data.data
      console.log(this.menus);
    }

  })

  },
  components: {
    card
  },
  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.home {
  .search {
    padding: 20rpx 16rpx;
    background-color: #eb4450;
    .search-input {
      height: 60rpx;
      background-color: #fff;
      font-size: 26rpx;
      color: #bbb;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .swiper{
    height: 340rpx;
      image{
          width: 100%;
          height: 100%;
      }
  }
    .nav_list {
      padding: 20rpx 0;
     display: flex;
      > li {
        width: 25%;
        justify-content: space-around;
        display: flex;
        align-items: center;
        img{
          width: 128rpx;
          height: 140rpx;
        }
      }
    }
}
</style>

