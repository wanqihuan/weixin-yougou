<template>
  <div class="category">
    <!-- 搜素 -->
  <search></search>
    <div class="main">
      <div class="main_left">
        <ul v-for="(item,index) in categoriesData" :key="index">
          <li >{{item.cat_name}}</li>
          <!-- <li class="item">热门推荐</li> -->
        </ul>
      </div>
      <div class="main_right">
        <div class="main_right_theme">
          <img src="http://www.huangjiangjun.top/pyg/banner2.png" alt="">
        </div>
        <div class="main_right_content" >
           <div class="main_right_title" v-for="(item,index) in categoriesinit" :key="index">/　{{item.cat_name}}　/ </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import search from '@/components/search'
import request from "@/utils/request";

export default {
  data () {
    return {
      categoriesData:[],
      categoriesinit:[]
    }
  },

  components: {
    card,
    search
  },
   mounted () {
    request("https://www.zhengzhicheng.cn/api/public/v1/categories")
    .then(res=>{
      console.log(res);
      this.categoriesData=res.data.message
      // console.log(this.categoriesData[0]);
      this.categoriesinit=res.data.message[0].children
      console.log(this.categoriesinit);
    })
   },
  methods: {

  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
 .category{
  .main{
    display: flex;
    height: 100%;
    // overflow: hidden;
    .main_left{
       width: 198rpx;
       background-color: #f4f4f4;
       ul{
         >li{
          padding: 20rpx 0;
          font-size: 32rpx;
            border-bottom: 1px solid #ccc;
           display: flex;
           justify-content:center;
           align-items: center;
          &.active{
            border-left: 4px solid red;
         }
         }
       }
    }
    .main_right{
      padding: 20rpx;
     height: 100%;
     width: 100%;
      .main_right_theme{
        height: 176rpx;
         >img{
           width: 100%;
           height: 100%;
         }
      }
      .main_right_title{
        padding: 20rpx 0;
        text-align: center;
      }


    }
  }
 }
</style>
