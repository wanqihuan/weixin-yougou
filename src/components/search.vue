<template>
  <div class="search">
    <div class="search-input" @tap="handlerSearch">
      <icon type="search" size="32rpx" class="search-icon"></icon>搜素
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handlerSearch() {
      wx.navigateTo({
        url:"../search/main"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>

