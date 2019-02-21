<template>
  <div class="category">
    <!-- 搜素 -->
  <search></search>
  <!-- 主要内容 -->
    <div class="main">
      <!-- 左边菜单栏 -->
      <div class="main_left">
        <ul v-for="(item,index) in categoriesData" :key="index">
          <li @click="handertoggle(index)" :class="{active:num==index}">{{item.cat_name}}</li>
        </ul>
      </div>
      <!-- 右边产品 -->
      <div class="main_right">
        <div class="main_right_theme">
          <img src="http://www.huangjiangjun.top/pyg/banner2.png" alt="">
        </div>
        <div class="main_right_content" v-for="(item,index) in categoriesList" :key="index" >
           <div class="main_right_title" >/　{{item.cat_name}}　/ </div>
           <ul class="main_right_list">
             <li v-for="(item1,index1) in item.children" :key="index1">
                 <img :src="item1.cat_icon" alt="">
                 <p>{{item1.cat_name}}</p>
             </li>
           </ul>
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
      num:0,
      categoriesData:[],
      categoriesList:[]
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
      this.categoriesList=res.data.message[0].children
      // console.log(this.categoriesinit);
    })
   },
  methods: {
    // 根据索引切换数据
    handertoggle(index){
      // console.log(index);
      this.categoriesList=this.categoriesData[index].children
      // 切换left菜单栏样式
      this.num=index
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
 .category{
  .main{
    // overflow: scroll;
    display: flex;
    // height: 100%;
    // position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 98rpx;
    .main_left{
       width: 200rpx;
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
      flex: 1;
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
      .main_right_list{
        display: flex;
        flex-wrap: wrap;
        li{
          width: 33.33%;
          text-align: center;
          img{
            width: 120rpx;
            height: 120rpx;
          }
          p{
            font-size: 30rpx;
          }
        }
      }


    }
  }
 }
</style>
