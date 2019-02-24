import Vue from 'vue'
import App from './App'
// weui样式
import "../dist/wx/static/style/weui.css"

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
