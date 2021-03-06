import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login => require(['@/components/shopping/shopping'], login) // 默认登录页面
    },
    {
      path: '/login',
      component: login => require(['@/components/login'], login) // 登录页面
    },
    {
      path: '/register',
      component: index => require(['@/components/common/register'], index) // 注册页面
    },
    {
      path: '/shopping',
      component: shopping => require(['@/components/shopping/shopping'], shopping) // 商品列表
    },
    {
      path: '/commodity',
      component: commodity => require(['@/components/shopping/commodity'], commodity) // 商品信息
    },
    {
      path: '/wx-friends',
      component: wxFriends => require(['@/components/shopping/wx-friends'], wxFriends) // 分享编辑-信息填写
    },
    {
      path: '/choice-picture',
      component: choicePicture => require(['@/components/shopping/choice-picture'], choicePicture) // 分享编辑-选择图片
    },
    {
      path: '/share',
      component: share => require(['@/components/shopping/share'], share) // 分享页面
    },
    {
      path: '/commodity-disappear',
      component: commodityDisappear => require(['@/components/common/commodity-disappear'], commodityDisappear) // 页面提示窗口
    }
  ]
})
