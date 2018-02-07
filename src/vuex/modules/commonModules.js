/**
 * 商品信息
 */
import ls from '../utils/LStorage'

const lsName = { // 本地缓存名称
  disappearName: '' // 页面提示窗口
}

const commonModules = {
  state: { // 唯一数据源
    isDisappear: ls.getItem(lsName.disappearName) || '' // 页面提示窗口
  },
  mutations: { // 修改数据
    isDisappearMutations (state, value) { // 页面提示窗口
      state.isDisappear = value
    }
  },
  actions: { // 数据异步处理
    isDisappearActions ({commit}, value) { // 缓存页面提示窗口
      commit('isDisappearMutations', value)
      console.log(value)
      ls.setItem(lsName.disappearName, value)
    }
  }
}

export default commonModules
