import Vue from 'vue'
import Vuex from 'vuex'
import mainModules from './modules/mainModules' // 主窗口缓存数据
import pictureModules from './modules/pictureModules' // 商品缓存数据
import commonModules from './modules/commonModules' // 常用缓存数据
import shoppingModules from './modules/shoppingModules' // 图片缓存数据
import loginModules from './modules/loginModules' // 登录、注册等缓存数据

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mainModules: mainModules,
    pictureModules: pictureModules,
    commonModules: commonModules,
    shoppingModules: shoppingModules,
    loginModules: loginModules
  }
})
