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

// 接口请求方式
const axioshttp = (self, url, params) => {
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

// 弹出框显示
const alertPluginShow = (self, title, content) => {
  self.$vux.alert.show({
    title: title,
    content: content
  })
}

export default {
  install (Vue) {
    Vue.prototype.$axioshttp = {
      axios: axioshttp,
      alertShow: alertPluginShow
    }
  }
}
