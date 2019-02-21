<template>
  <div class="home">
    <!-- <div class="search">
      <div class="search-input">
        <icon type="search" size="32rpx" class="search-icon"></icon>搜素
      </div>
    </div> -->
    <!-- 搜素 -->
    <search></search>
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true">
      <block v-for="(item, index) in imgUrl" :key="index">
        <swiper-item>
          <img :src="item.image_src" class="slide-image">
        </swiper-item>
      </block>
    </swiper>
    <!-- 导航栏 -->
    <ul class="nav_list">
      <li v-for="(item,index) in menus" :key="index">
        <img :src="item.image_src" alt>
      </li>
    </ul>
    <!-- 楼层 -->
    <div class="floor">
      <div class="floor_content" v-for="(item,index) in floordata" :key="index">
        <div class="floor_title">
          <img :src="item.floor_title.image_src" alt>
        </div>
        <div class="floor_body">
          <div class="floor_body_left">
            <img :src="item.product_list[0].image_src" alt>
          </div>
          <div class="floor_body_right">
            <img
             v-for="(item1,index1) in item.product_list"
              :key="index1"
              v-show="index1!=0"
              :src="item1.image_src"
              alt=""
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from "@/components/card";
import search from "@/components/search"
import request from "@/utils/request";
export default {
  data() {
    return {
      imgUrl: [],
      menus: [],
      floordata: [],
      floordata1:[]
    };
  },
  mounted() {
    // let that = this;
    //  wx.request({
    //   url: 'https://itjustfun.cn/api/public/v1/home/swiperdata',
    //   success(res){
    //     // console.log(res)
    //     // 这是因为this作用域指向问题 ，success函数实际是一个闭包 ， 无法直接通过this来imgUrl
    //     that.imgUrl=res.data.data
    //   }
    //   }),
    //   // 导航栏
    //   wx.request({
    //     url:'https://itjustfun.cn/api/public/v1/home/catitems',
    //     // 箭头函数
    //     success:(res)=>{
    //       console.log(res);
    //       this.menus=res.data.data
    //       console.log(this.menus);
    //     }

    //   })
    // 轮播图
    request("https://www.zhengzhicheng.cn/api/public/v1/home/swiperdata").then(
      res => {
        // console.log(res);
        this.imgUrl = res.data.message;
      }
    );
    //菜单导航栏
    request("https://www.zhengzhicheng.cn/api/public/v1/home/catitems").then(
      res => {
        // console.log(res);
        this.menus = res.data.message;
      }
    );
    // 楼层数据
    request("https://www.zhengzhicheng.cn/api/public/v1/home/floordata").then(
      res => {
        console.log(res);
        this.floordata = res.data.message;
        // console.log(this.floordata);
      }
    );

    // console.log(request);
  },
  components: {
    card,
    search
  },
  methods: {},

  created() {
    // let app = getApp()
  }
};
</script>

<style lang="scss" scoped>
.home {
  .swiper {
    height: 340rpx;
    image {
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
      img {
        width: 128rpx;
        height: 140rpx;
      }
    }
  }
  .floor {
    .floor_content {
      .floor_title {
         padding: 10rpx 0 ;
        width: 100%;
        height: 59rpx;
        > img {
          width: 100%;
          height: 100%;
        }
      }
      .floor_body {
        padding: 10rpx 20rpx;
        display: flex;
        .floor_body_left{
          width: 232rpx;
          height: 386rpx;
          margin-right:10rpx;
          >img{
            width:100%;
            height: 100%;
          }
        }
        .floor_body_right{
          flex: 1;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          >img{
           width: 232rpx;
           height: 188rpx;
          }
        }
      }
    }
  }
}
</style>

