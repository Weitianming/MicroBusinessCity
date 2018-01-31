// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router' // 路由组件
import { AjaxPlugin, AlertPlugin, ToastPlugin, WechatPlugin } from 'vux' // vux全局
import MintUI from 'mint-ui' // MintUI全局
import 'mint-ui/lib/style.css' // MintUI全局样式
import FastClick from 'fastclick' // 去除手机300毫秒延迟
import router from './router' // 路由器
import store from './vuex/store' // store为实例化生成的
import App from './App'
import $ from 'jquery'
import axioshttp from './api/axioshttp' // 网络请求方法
import api from './api/api' // 接口
import 'lib-flexible' // 手机屏幕适配

require('es6-promise').polyfill() // 搭配axios网络请求
FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.use(MintUI)
Vue.use(axioshttp)

window.$ = $
window.API = api

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
