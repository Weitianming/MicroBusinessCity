/**
 * 网络请求
 */
var path = process.env.API_ROOT

// 参数封装
const searchParam = params => {
  var searchParam = new URLSearchParams()
  for (var key in params) {
    if (Array.isArray(params[key])) {
      searchParam.append(key, JSON.stringify(params[key]))
    } else {
      searchParam.append(key, params[key])
    }
  }
  return searchParam
}

// 个人平台接口
const axioshttpPersonal = (self, url, params) => {
  var data = {}
  if (params !== null && params !== undefined) {
    params['flag'] = self.$store.state.mainModules.flag
    data = searchParam(params)
  }
  return self.$http.post(path + url, data)
    .then(res => {
      return res
    }, res => {
      return res
    })
}

// 用户平台接口
const axioshttpUser = (self, url, params) => {
  var data = {}
  if (params !== null && params !== undefined) {
    params['flag'] = self.$store.state.mainModules.flag
    data = searchParam(params)
  }
  return self.$http.post(url, data)
    .then(res => {
      return res
    }, res => {
      return res
    })
}

// 租赁平台接口
const axioshttpLease = (self, url, params) => {
  var data = {}
  if (params !== null && params !== undefined) {
    params['flag'] = self.$store.state.mainModules.flag
    data = searchParam(params)
  }
  return self.$http.post(url, data)
    .then(res => {
      return res
    }, res => {
      return res
    })
}

// 弹出框显示
const alertPluginShow = (self, title, content) => {
  self.$vux.alert.show({
    title: title,
    content: content
  })
}

// 提示框显示
const toastPluginShow = (self, text) => {
  self.$vux.toast.text(text, 'default')
}

export default {
  install (Vue) {
    Vue.prototype.$axioshttp = {
      personal: axioshttpPersonal,
      user: axioshttpUser,
      lease: axioshttpLease,
      alertShow: alertPluginShow,
      toastShow: toastPluginShow
    }
  }
}
