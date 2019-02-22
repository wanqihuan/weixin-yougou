<template>
  <div class="category">
    <!-- 搜素 -->
    <search ></search>
    <!-- 主要内容 -->
    <view class="main">
      <!-- 左边菜单栏 -->
      <scroll-view class="main_left" scroll-y>
        <ul v-for="(item,index) in categoriesData" :key="index">
          <li @tap="handlertoggle(index)" :class="{active:num==index}">{{item.cat_name}}</li>
        </ul>
      </scroll-view>
      <!-- 右边产品 -->
      <scroll-view class="main_right" scroll-y>
        <div class="main_right_content" v-for="(item,index) in categoriesList" :key="index">
          <div class="main_right_title">
            <span>/</span>
            {{item.cat_name}}
            <span>/</span>
          </div>
          <ul class="main_right_list">
            <li v-for="(subItem,subIndex) in item.children" :key="subIndex" @tap="handlerSearch(subItem.cat_name)">
              <img :src="subItem.cat_icon" alt>
              <p>{{subItem.cat_name}}</p>
            </li>
          </ul>
        </div>
      </scroll-view>
    </view>
  </div>
</template>

<script>
// import card from "@/components/card";
import search from "@/components/search";
import request from "@/utils/request";

export default {
  data() {
    return {
      num: 0,
      // 所有数据
      categoriesData: [],
      // 右侧数据
      categoriesList: []
    };
  },

  components: {
  search
  },
  mounted() {
    request("https://www.zhengzhicheng.cn/api/public/v1/categories").then(
      res => {
        console.log(res);
        this.categoriesData = res.data.message;
        this.categoriesList = res.data.message[0].children;
      }
    );
  },
  methods: {
    // 点击根据索引切换数据
    handlertoggle(index) {
      this.categoriesList = this.categoriesData[index].children;
      // 切换left菜单栏样式
      this.num = index;
    },
    // 点击跳转到搜素页面
    handlerSearch(name){
    console.log(name);
    wx.navigateTo({
        url:"../search/main?name="+name+""
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.category {
  .main {
    display: flex;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 98rpx;
    .main_left {
      width: 200rpx;
      height: 100%;
      background-color: #f4f4f4;
      //  隐藏滚动条
      ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
      }
      ul {
        > li {
          padding: 20rpx 0;
          font-size: 32rpx;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          &.active {
            background-color: #fff;
            color: red;
            border-left: 4px solid red;
          }
        }
      }
    }
    .main_right {
      flex: 1;
      padding: 20rpx;
      height: 100%;
      box-sizing: border-box;
      .main_right_title {
        padding: 20rpx 0;
        text-align: center;
        > span {
          color: #ccc;
        }
      }
      .main_right_list {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 33.33%;
          text-align: center;
          img {
            width: 120rpx;
            height: 120rpx;
          }
          p {
            font-size: 30rpx;
          }
        }
      }
    }
  }
}
</style>
