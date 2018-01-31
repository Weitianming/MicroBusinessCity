export function JSONPRES(self, url, param) { // 网络请求方式
  var TOKEN = localStorage.getItem('erTokenID')
  if (TOKEN !== 'undefined' && TOKEN !== 'null') {
      param['token'] = TOKEN
  }
  return self.$http.jsonp(url, {
      params: param,
      dataType: 'jsonp'
  }).then(function(res) {
      return res.body
  }, function(res) {
    return res
  })
}

exports.install = function (Vue, options) {
    Vue.prototype.ajax = function (){
      return this.$http.jsonp()
    };
};