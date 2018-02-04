/**
 * 商品信息
 */
import ls from '../utils/LStorage'

const lsName = { // 本地缓存名称
  commodityIdName: 'commodityId' // 商品主键
}

const shoppingModules = {
  state: { // 唯一数据源
    commodityId: ls.getItem(lsName.commodityIdName) || 0 // 商品主键
  },
  mutations: { // 修改数据
    commodityIdMutations (state, value) { // 商品主键
      state.commodityId = value
    }
  },
  actions: { // 数据异步处理
    commodityIdActions ({commit}, value) { // 缓存商品主键
      commit('commodityIdMutations', value)
      ls.setItem(lsName.commodityIdName, value)
    }
  }
}

export default shoppingModules
