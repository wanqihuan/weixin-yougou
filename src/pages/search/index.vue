<template>
  <view class="search">
    <view class="search-input" >
      <icon type="search" size="32rpx" class="search-icon"></icon>
    </view>
  </view>
</template>
<script>
// import card from '@/components/card'

export default {
  data () {
    return {

    }
  },

  components: {
    // card
  },
  mounted () {
    // onLoad: function (options) {
    // console.log('onLoad')

  },

  methods: {

  },

  created () {
    // let app = getApp()
  }
}
</script>

<style lang="scss" scoped>
.search {
  padding: 20rpx 16rpx;
  background-color: #eee;
  .search-input {
    height: 60rpx;
    background-color: #fff;
    font-size: 26rpx;
    color: #bbb;
    // display: flex;
    // justify-content: center;
    // align-items: center;
     text-indent: 20rpx;
    line-height: 80rpx;

  }
}
</style>
