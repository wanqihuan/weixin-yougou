<template>
  <div class="auth">
    <!-- 需要button来授权 -->
    <button v-if="canIUse" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
    <view v-else>请升级微信版本</view>
  </div>
</template>

<script>
import { getToken } from "@/api";
export default {
  data() {
    return {
      canIUse: wx.canIUse("button.open-type.getUserInfo")
    };
  },

  components: {},

  methods: {
    bindGetUserInfo(e) {
      console.log(e.mp.detail);
      // 在微信小程序中，要获取用户信息需要 e.mp 获取
      const { encryptedData, iv, rawData, signature } = e.mp.detail;
      wx.login({
        success(res) {
          // 获取login接口的code数据
          if (res.code) {
            const { code } = res;
            console.log("code");
            // 按要求准备发送data数据
            getToken({
              encryptedData,
              iv,
              rawData,
              signature,
              code
            }).then(res=>{
              console.log(res);
             wx.setStorageSync('token',res.data.message.token);
            })
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  },

  created() {
    // let app = getApp()
  }
};
</script>

<style scoped>
</style>
