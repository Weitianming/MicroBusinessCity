import Vue from 'vue'
import Vuex from 'vuex'
import mainModules from './modules/mainModules' // 图片缓存数据
import pictureModules from './modules/pictureModules' // 图片缓存数据
import shoppingModules from './modules/shoppingModules' // 图片缓存数据
import loginModules from './modules/loginModules' // 登录、注册等缓存数据

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mainModules: mainModules,
    pictureModules: pictureModules,
    shoppingModules: shoppingModules,
    loginModules: loginModules
  }
})
