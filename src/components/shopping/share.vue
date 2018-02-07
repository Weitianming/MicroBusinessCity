<style>
  /*底部tab*/
  #share .weui-tabbar{position: fixed; height: 60px!important; background-color: #fff; display: inherit;}
  #share .weui-tabbar__item{float: left;}
  #share .weui-tabbar .vux-x-icon{width: 25px; height: 25px;}
  #share .weui-tabbar__label{margin: 0 auto; color: #000; font-size: 15px;}
  #share .weui-tabbar .tabbar-money{width: 40%; padding: 6px 0px 4px 0px;}
  #share .weui-tabbar .tabbar-money-browser{width: 55%;}
  #share .weui-tabbar .tabbar-money .weui-tabbar__label{font-size: 20px; color: red; font-weight: bold;}
  #share .weui-tabbar .tabbar-consultation{width: 29%; padding: 6px 0px 4px 0px; background-color: #fa0;}
  #share .weui-tabbar .tabbar-consultation .weui-tabbar__label{font-size: 18px; color: #fff;}
  #share .weui-tabbar .tabbar-contact{width: calc(31% - 1px);/*no*/ padding: 6px 0px 4px 0px; background-color: #ec3e36;}
  #share .weui-tabbar .tabbar-contact-browser{width: 45%;}
  #share .weui-tabbar .tabbar-contact .weui-tabbar__label{font-size: 18px; color: #fff;}
  
  /*商品样式*/
  #share .commodityHome-class{margin-bottom: 60px;}
  #share .mint-tab-container{overflow: inherit;}
  #share .mint-tab-container-item{background-color: #f6f6f6;}
  #share .card{margin: 0 auto; box-shadow: 0 0;}
  #share .card-header.color-white.no-border.no-padding{width: 100%;}
  #share .mint-swipe{width: 100%; height: 100%; overflow: inherit; position: absolute;}
  #share .lazy-img{width: 100%;}
  #share .card-content{background-color: #fff;}
  #share .card-content-inner{padding: 10px 16px;}
  #share .card-content-inner-div-title{font-size: 20px; font-weight: bold;}
  
  /*详情样式*/
  #share .vux-divider{margin-top: 10px;}
  #share .details-content{line-height: 0;}
  
  /*分享提示框*/
  .vux-popup-g{z-index: 1000; overflow: inherit; color: #fff;}
  .vux-popup-g .vux-popup-div{width: 100%; background-color: #000; opacity:0.7; height: 200px; margin: 0 auto;}
  .vux-popup-g .close{width: 20px; height: 20px; position: relative; top: 4px; right: 10px; fill: #fff;}
  .vux-popup-g .vux-popup-div-title{text-align: right; padding: 16px; font-size: 18px;}
  .vux-popup-g .vux-popup-div-content{padding: 4px 16px; font-size: 16px; overflow: auto;}
  .vux-popup-g .vux-x-input{float: left; width: 80%; padding: 0; background-color: #09BB07; border-radius: 15px; font-size: 14px;}
  .vux-popup-g .vux-x-input input{text-align: center; padding: 6px 0;}
  .vux-popup-g .vux-input-span{float: right; background-color: #09BB07; width: 18%; text-align: center; border-radius: 15px; padding: 4px 0; display: inline-block;}
</style>

<template>
  <div id="share" style="height: 100%;">

    <mt-tab-container v-model="isSelected">
      <mt-tab-container-item id="commodityHome" class="commodityHome-class">

        <!--商品-->
        <div id="commodityHome-div-height" class="card demo-card-header-pic grid-item-img">
          <div valign="bottom" class="card-header color-white no-border no-padding">
            <mt-swipe :auto="0" :show-indicators="false">
              <mt-swipe-item v-for="cimg in params.commodityImg" :key="cimg.img">
                <img class="lazy-img" v-lazy.vux_view_box_body="cimg.img">
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="card-content">
            <div class="card-content-inner">
              <div class="card-content-inner-div-title">{{params.title}}</div>
            </div>
          </div>
          <div class="card-content">
            <cell title="颜色" :value="params.colour"></cell>
            <cell title="尺寸" :value="params.size"></cell>
            <cell title="联系方式" :value="params.phone"></cell>
            <cell title="QQ" :value="params.qq"></cell>
          </div>
        </div>

        <!--商品详情-->
        <divider>商品详情</divider>
        <ul class="details-content">
          <li v-for="src in params.detailsList">
            <img class="lazy-img" v-lazy.vux_view_box_body="src">
          </li>
        </ul>

      </mt-tab-container-item>
    </mt-tab-container>

    <!--底部菜单栏-->
    <tabbar>
      <tabbar-item class="tabbar-money" :class="!isBrowser ? 'tabbar-money-browser' : ''">
        <span slot="label">¥ {{params.money}}</span>
      </tabbar-item>
      <tabbar-item v-if="isBrowser" class="tabbar-consultation" @click.native="startQQ(params.qq)">
        <span slot="label">QQ咨询</span>
      </tabbar-item>
      <tabbar-item class="tabbar-contact" :class="!isBrowser ? 'tabbar-contact-browser' : ''" @click.native="startPhone(params.phone)">
        <span slot="label">电话联系</span>
      </tabbar-item>
    </tabbar>
    
    <!--分享提示框-->
    <div v-transfer-dom>
      <popup class="vux-popup-g" v-model="isPopup" position="top" :show-mask="false" is-transparent >
        <div class="vux-popup-div">
        	<div class="vux-popup-div-title">
        		<x-icon slot="icon" type="close" class="close" @click.native="isPopup = false"></x-icon>
        		<span @click="isPopup = false">关闭提示</span>
        	</div>
        	<div class="vux-popup-div-content">本商品链接为：</div>
        	<div class="vux-popup-div-content">
        		<x-input v-model="params.commodityUrl" :show-clear="false" placeholder=" "></x-input>
        		<span class="vux-input-span" v-clipboard:copy="params.commodityUrl" v-clipboard:success="copyUrl" v-clipboard:error="copyUrlError">复制</span>
        	</div>
        	<div class="vux-popup-div-content">您也可以通过浏览器分享本商品页</div>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { TransferDom, Cell, Tabbar, TabbarItem, Divider, Popup, XInput } from 'vux'
import { mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    Cell,
    Tabbar,
    TabbarItem,
    Divider,
    Popup,
    XInput
  },
  data () {
    return {
      isSelected: 'commodityHome', // 这是bug(不能删)
      isBrowser: true, // 判断是否是微信浏览器
      commodityId: '', // 分享商品主键
      isPopup: false, // 分享提示框
      params: {
        commodityUrl: '', // 当前商品URL
        commodityImg: [], // 商品图片
        title: '', // 标题
        money: '', // 价格
        colour: '', // 颜色
        size: '', // 尺寸
        phone: '', // 手机号
        qq: '', // QQ号
        detailsList: [] // 详情图片
      },
      loading: false // 上拉加载
    }
  },
  activated () {
    this.commodityId = this.$route.query.id
    if (this.commodityId !== '' && this.commodityId !== null && this.commodityId !== undefined) {
      this.inif()
    } else {
      this.inifError()
    }
  },
  deactivated () {
    this.$destroy() // 销毁
  },
  methods: {
    ...mapActions('state/commonModules', ['isDisappearActions']),
    inif () { // 初始化
      this.isPopup = this.$store.state.shoppingModules.isPopup // 是否显示分享提示框
      if (this.isPopup) {
        this.params.commodityUrl = window.location.href // 获取当前链接
      }
      this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
      $('.card-header.color-white.no-border.no-padding').css('height', $('#share').width()) // 设置商品信息图片高度
      $('.mint-swipe').css('height', $('#share').width()) // 设置商品信息图片高度
      this.getCommodityInformation() // 获取商品信息
      this.getBrowser() // 判断浏览器
    },
    inifError () { // 商品不存在
      this.$store.dispatch('isDisappearActions', 'warn')
      this.$router.push({ path: '/commodity-disappear' })
    },
    getCommodityInformation () { // 获取商品信息
      const self = this
      let param = {
        id: self.commodityId
      }
      self.$axioshttp.axios(self, API.mobileTerminal_commodityInformation, param).then(res => {
        $.each(res.data.model.commodityImg, (i, value) => {
          self.params.commodityImg.push({
            img: value
          })
        })
        self.params.title = res.data.model.title
        self.params.money = res.data.model.money
        self.params.colour = res.data.model.colour
        self.params.size = res.data.model.size
        self.params.phone = res.data.model.phone
        self.params.qq = res.data.model.qq
        self.params.detailsList = res.data.model.detailsList
      })
    },
    startQQ (qq) { // 启动QQ
      window.location.href = `mqqwpa://im/chat?chat_type=wpa&uin=${qq}&version=1&src_type=web&web_src=oicqzone.com`
    },
    startPhone (phone) { // 拨打电话
      window.location.href = `tel://${phone}`
    },
    getBrowser () { // 判断浏览器
      if (this.$store.state.mainModules.isBrowser) {
        this.isBrowser = false
      }
    },
    copyUrl () { // 复制URL
      this.$vux.toast.text('复制成功', 'middle')
    },
    copyUrlError () { // 复制URL失败
      this.$vux.toast.text('该浏览器暂不支持复制', 'middle')
    }
  }
}
</script>
