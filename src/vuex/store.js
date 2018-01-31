import Vue from 'vue'
import Vuex from 'vuex'
import pictureModules from './modules/pictureModules' // 图片缓存数据
import shoppingModules from './modules/shoppingModules' // 图片缓存数据
import loginModules from './modules/loginModules' // 登录、注册等缓存数据

Vue.use(Vuex)

const mainModules = {
  state: { // 唯一数据源
    scroll: '0', // 滚动条位置
    isScroll: false, // 滚动条监听状态
    setScrollIndex: null // 设置滚动条位置
  },
  mutations: { // 修改数据
    scrollMutations (state, value) { // 监听滚动条-位置
      state.scroll = value
    },
    scrollMutationsTrue (state) { // 监听滚动条-开始
      state.isScroll = true
    },
    scrollMutationsFalse (state) { // 监听滚动条-关闭
      state.isScroll = false
    },
    setScrollIndexMutations (state, value) { // 监听滚动条-设置滚动条位置
      state.setScrollIndex = value
    }
  }
}

export default new Vuex.Store({
  modules: {
    mainModules: mainModules,
    pictureModules: pictureModules,
    shoppingModules: shoppingModules,
    loginModules: loginModules
  }
})
