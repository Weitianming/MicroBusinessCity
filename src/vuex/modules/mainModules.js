const mainModules = {
  state: { // 唯一数据源
    isBrowser: '', // 浏览器类别
    shoppingScroll: 0, // 商品列表滚动条位置
    isShoppingScroll: false, // 商品列表滚动条位置状态
    scroll: -1, // 滚动条位置
    isScroll: false, // 滚动条监听状态
    setScrollIndex: null // 设置滚动条位置
  },
  mutations: { // 修改数据
    isBrowserMutations (state, value) { // 浏览器类别
      state.isBrowser = value
    },
    shoppingScrollMutations (state, value) { // 商品列表-滚动条位置
      state.shoppingScroll = value
    },
    shoppingScrollMutationsTrue (state) { // 商品列表-监听滚动条位置开始
      state.isShoppingScroll = true
    },
    shoppingScrollMutationsFalse (state) { // 商品列表-监听滚动条位置开始
      state.isShoppingScroll = false
    },
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

export default mainModules
