<style type="text/css">
	@import '../static/css/style.css';
	#main{width:100%; height:100%;}
	.vux-header-scroll-top{position: fixed!important;}
	#vux_view_box_body{padding-bottom: 0;}
	
	/*标题栏*/
	.app-vux-header{background-color: #f2f2f2!important; z-index: 1000;}
	.app-vux-header .vux-header-title{height: 80px!important;}
	.app-vux-header .vux-header-left{font-size: 34px!important; line-height: 34px!important; top: 0!important; padding: 26px; font-family: "microsoft yahei";}
	.app-vux-header-left-a{color: #6c6c6c!important;}
	.app-vux-header .vux-header-right{top: 0!important;}
	.classification{width: 80px; height: 80px; line-height: 0px; fill: #6c6c6c;}

	/*菜单*/
	.vux-popup-div{height: calc(100% - 80px)!important; margin-top: 80px; padding: 16px 0; background-color: #fafafa!important; z-index: 999;}
	.vux-popup-div .popup{width: 100%; padding: 16px 0;}
	.app-vux-flexbox{padding: 16px 0;}
	.app-vux-flexbox .flex-demo{text-align: center; padding: 12px; margin: 12px 18px; color: #666; background-color: #fff; border: 1px solid #eee; background-clip: padding-box;}
	
</style>

<template>
  <div id="app" style="height: 100%;">
    <div id="main" :class="classification.isState ? 'vux-header-scroll-top' : ''">
      <view-box ref="viewBox">
        <x-header class="app-vux-header">
          <a slot="overwrite-left" class="app-vux-header-left-a">首页</a>
          <x-icon class="classification" slot="right" type="navicon" size="35" @click="classificationButton"></x-icon>
        </x-header>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </view-box>
    </div>

    <popup v-model="classification.isState" position="top" :show-mask="false" class="vux-popup-div">

      <div class="popup">
        <divider>热门分类</divider>
        <flexbox :gutter="0" wrap="wrap" class="app-vux-flexbox">
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试1</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试2</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试3</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试4</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试5</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试6</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试7</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试8</div>
          </flexbox-item>
        </flexbox>
      </div>

      <div class="popup">
        <divider>热门品牌</divider>
        <flexbox :gutter="0" wrap="wrap" class="app-vux-flexbox">
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试1</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试2</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试3</div>
          </flexbox-item>
          <flexbox-item :span="1/4">
            <div class="flex-demo">测试4</div>
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
        isState: false // 是否显示分类界面
      }
    }
  },
  mounted () {
    this.handler = () => { // 监听滚动条位置
      this.$store.commit('scrollMutations', this.$refs.viewBox.getScrollTop())
    }
  },
  created () {},
  methods: {
    classificationButton () { // 分类按钮
      this.classification.isState = !this.classification.isState
    },
    overwriteReturn () { // 返回按钮
      this.$router.go(-1)
    }
  },
  watch: {
    '$store.state.mainModules.isShoppingScroll': function (val) { // 商品列表-是否监听滚动条
      const self = this
      if (val) {
        self.$store.commit('shoppingScrollMutations', self.$refs.viewBox.getScrollTop())
        self.$store.commit('shoppingScrollMutationsFalse')
        self.$refs.viewBox.scrollTo(0)
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
      if (val !== null) {
        if (self.$store.state.mainModules.scroll !== val) {
          self.$refs.viewBox.scrollTo(val)
          self.$store.commit('setScrollIndexMutations', null)
        }
      }
    }
  },
  name: 'app'
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  
  /*滚动列表弹窗*/
  /*.vux-popup-header{font-size: 32px!important; height: 70px!important; line-height: 70px!important;}
  .vux-popup-header-left{padding-left: 30px!important;}
  .vux-popup-header-right{padding-right: 30px!important;}*/
	
  /*上拉加载*/
  .weui-loadmore {line-height: 100px!important; margin-top: 0!important; margin-bottom:  16px!important;}
  .weui-loading {width: 40px!important; height: 40px!important;}
  .weui-loadmore__tips {font-size: 32px!important;}
  
</style>
