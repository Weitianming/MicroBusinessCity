<style>
  @import '../static/css/style.css';
  #main{width:100%; height:100%;}
  #vux_view_box_body{padding-bottom: 0;}
  .vux-header-scroll-top{position: fixed!important; width: 100%;}
  .vux-header-scroll-top-div{margin-top: 46px;}
  
  /*标题栏*/
  .app-vux-header{background-color: #f2f2f2!important; z-index: 1000;}
  .app-vux-header-left-a{color: #6c6c6c!important; font-family: "microsoft yahei";}
  .app-vux-header .vux-header-right{top: 5px!important;}
  .classification{width: 35px; height: 35px; fill: #6c6c6c;}
  
  /*菜单*/
  #app-popup {height: calc(100% - 46px)!important; margin-top: 46px; background-color: #fafafa!important; z-index: 999;}
  #app-popup .popup{width: 100%; padding: 6px 0;}
  #app-popup .app-vux-flexbox .flex-demo{text-align: center; padding: 5px; margin: 6px 10px; color: #666; background-color: #fff; border: 1px solid #eee; background-clip: padding-box;}
</style>

<template>
  <div id="app" style="height: 100%;">
  	
    <div id="main">
      <view-box ref="viewBox">
        <x-header class="app-vux-header" :class="classification.isState ? 'vux-header-scroll-top' : ''">
          <a slot="overwrite-left" class="app-vux-header-left-a">首页</a>
          <x-icon class="classification" slot="right" type="navicon" size="35" @click="classificationButton"></x-icon>
        </x-header>
        <keep-alive>
          <router-view :class="classification.isState ? 'vux-header-scroll-top-div' : ''"></router-view>
        </keep-alive>
        <div style="width: 100%; height: 100%; top: 0; position: fixed; z-index: -1; background-color: #DEDEDE;"></div>
      </view-box>
    </div>

    <popup id="app-popup" v-model="classification.isState" position="top" :show-mask="false" class="vux-popup-div">
      <div class="popup" v-for="clist in classification.classificationList">
        <divider :key="clist.id">{{clist.name}}</divider>
        <flexbox :gutter="0" wrap="wrap" class="app-vux-flexbox">
          <flexbox-item v-for="slist in clist.subsetList" :key="slist.id" :span="1/4">
            <div class="flex-demo" @click="classificationClick(slist.id)">{{slist.name}}</div>
          </flexbox-item>
        </flexbox>
      </div>
    </popup>
    
  </div>
</template>

<script>
import { ViewBox, XHeader, Popup, Divider, Flexbox, FlexboxItem } from 'vux'

export default {
  components: {
    ViewBox,
    XHeader,
    Popup,
    Divider,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      classification: { // 分类数据
        isState: false, // 是否显示分类界面
        classificationList: [] // 分类数据
      }
    }
  },
  mounted () {
    this.handler = () => { // 监听滚动条位置
      this.$store.commit('scrollMutations', this.$refs.viewBox.getScrollTop())
    }
  },
  created () {
    this.getClassification() // 获取分类
    this.getBrowser() // 判断浏览器
  },
  methods: {
    getClassification () { // 获取分类
      const self = this
      self.$axioshttp.axios(self, API.mobileTerminal_classification, {}).then(res => {
        self.classification.classificationList = res.data.model.classificationList
      })
    },
    classificationButton () { // 分类窗口按钮
      this.classification.isState = !this.classification.isState
    },
    classificationClick (id) { // 分类按钮事件监听
      this.classification.isState = false
      this.$vux.toast.text('暂未开放', 'middle')
    },
    getBrowser () { // 判断浏览器
      let ua = window.navigator.userAgent.toLowerCase()
      if (ua.indexOf('micromessenger') > 0) { // 是否微信浏览器
        this.$store.commit('isBrowserMutations', 'micromessenger')
      }
//    if (ua.match(/MicroMessenger/i) === 'micromessenger') { // 是否微信浏览器
//      this.$store.commit('isBrowserMutations', 'micromessenger')
//    }
    }
  },
  watch: {
    '$store.state.mainModules.isShoppingScroll': function (val) { // 商品列表-获取当前滚动条位置
      const self = this
      if (val) {
        self.$store.commit('shoppingScrollMutations', self.$refs.viewBox.getScrollTop())
        self.$store.commit('shoppingScrollMutationsFalse')
      }
    },
    '$store.state.mainModules.isScroll': function (val) { // 是否监听滚动条
      const self = this
      if (val) {
        document.querySelector('#vux_view_box_body').removeEventListener('scroll', self.handler)
        document.querySelector('#vux_view_box_body').addEventListener('scroll', self.handler)
      } else {
        document.querySelector('#vux_view_box_body').removeEventListener('scroll', self.handler)
      }
    },
    '$store.state.mainModules.setScrollIndex': function (val) { // 设置滚动条位置
      const self = this
      if (val >= 0) {
        if (self.$store.state.mainModules.scroll !== val) {
          self.$refs.viewBox.scrollTo(val)
          setTimeout(() => {
            self.$store.commit('setScrollIndexMutations', -1)
          }, 0)
        }
      }
    }
  },
  name: 'app'
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  
  /*上拉加载*/
  .weui-loadmore {line-height: 40px!important; margin-top: 0px!important; margin-bottom: 0px!important;}
</style>
