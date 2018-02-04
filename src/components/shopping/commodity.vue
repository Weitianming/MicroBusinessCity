<style>
  /*头部tab*/
  #commodity .vux-tab {height: 100px!important;}
  #commodity .vux-tab-item {font-size: 30px!important; line-height: 100px!important;}
  #commodity .vux-tab-scroll-top{position: fixed; width: 100%; top: 0; z-index: 10000;}
  #commodity .vux-container-scroll-top{margin-top: 100px;}
  #commodity .uploadClick{position: absolute; right: 40px; top: 150px; line-height: 60px; color: #fff; width: 160px; background-color: #000; z-index: 10000; opacity:0.8; fill: #fff; border-radius: 60px;}
  #commodity .vux-uploadClick{width: 48px; height: 48px; margin: 0 0 -13px 15px;}
  #commodity .uploadClick span{font-size: 30px;}
  
  /*底部tab*/
  #commodity .weui-tabbar{position: fixed; height: 100px!important; background-color: #fff; display: inherit;}
  #commodity .weui-tabbar__item{float: left;}
  #commodity .weui-tabbar .vux-x-icon{width: 40px; height: 40px;}
  #commodity .weui-tabbar__label{margin: 0 auto; color: #000; font-size: 24px;}
  #commodity .weui-tabbar .tabbar-shop{width: 20%; padding-top: 20px;}
  #commodity .weui-tabbar .tabbar-shop .weui-tabbar__icon{display: inherit; width: auto; height: auto;}
  #commodity .weui-tabbar .tabbar-collection{width: 20%; padding-top: 20px; border-left: 1px solid #e6e6e6;/*no*/}
  #commodity .weui-tabbar .tabbar-collection .weui-tabbar__icon{display: inherit; width: auto; height: auto;}
  #commodity .weui-tabbar .tabbar-collection .isIosStar{fill: #FFB90F;}
  #commodity .weui-tabbar .tabbar-purchase{width: 29%; padding-top: 10px; height: 100%; background-color: #ec3e36;}
  #commodity .weui-tabbar .tabbar-purchase .weui-tabbar__label{font-size: 36px; line-height: 85px; color: #fff;}
  #commodity .weui-tabbar .tabbar-shopping{width: calc(31% - 1px);/*no*/ padding-top: 10px; height: 100%; background-color: #fa0;}
  #commodity .weui-tabbar .tabbar-shopping .weui-tabbar__label{font-size: 36px; line-height: 85px; color: #fff;}
  
  /*商品样式*/
  #commodity .commodityHome-class{margin-bottom: 100px;}
  #commodity .mint-tab-container{overflow: inherit;}
  #commodity .mint-tab-container-item{background-color: #f6f6f6;}
  #commodity .card{margin: 0 auto; box-shadow: 0 0;}
  #commodity .card-header.color-white.no-border.no-padding{width: 100%;}
  #commodity .mint-swipe{width: 100%; height: 100%; overflow: inherit; position: absolute;}
  #commodity .lazy-img{width: 100%;}
  #commodity .card-content{background-color: #fff;}
  #commodity .card-content-inner{padding: 20px 32px;}
  #commodity .card-content-inner-div-title{font-size: 34px; line-height: 36px;}
  #commodity .color-gray{margin: 30px 0px 20px 0!important; color: #4f4f4f; font-size: 28px; line-height: 30px;}
  #commodity .card-content-inner-div-money{color: #ec3e36; overflow: hidden;}
  #commodity .floatL{float: left;}
  #commodity .floatR{float: right;}
  #commodity .card-content-inner-div-money-symbol{font-size: 30px;}
  #commodity .card-content-inner-div-money-content{font-size: 38px;}
  #commodity .card-content-inner-div-commodityDate{color: #999; font-size: 28px; line-height: 56px;}
  #commodity .borderTop{margin: 0 32px; padding: 20px 0; border-top: 1px solid #ccc; color: #949494; font-size: 24px; overflow: auto;}
  #commodity .borderTop li{list-style-type: none; float: left; padding: 0 8px; border-left: 1px solid #ccc; }
  #commodity .borderTop span{padding-left: 4px;font-size: 24px; color: #000;}
  #commodity .borderTop .borderTop-li1{padding-left: 0!important; border-left: none!important;}
  #commodity .borderTop .borderTop-li1 span{color: #f60;}
  
  /*详情样式*/
  #commodity .vux-divider{margin-top: 10px;}
  #commodity .details-content{line-height: 0;}
  
  /*分享列表*/
  #commodity .weui-actionsheet__cell.vux-actionsheet-menu-default{padding: 20px 24px;/*px*/ font-size: 32px;/*px*/}
</style>

<template>
  <div id="commodity" style="height: 100%;">
  	
  	<!--头部菜单栏-->
    <tab bar-active-color="red" active-color='#000' :class="isScroll ? 'vux-tab-scroll-top' : ''">
      <tab-item selected @on-item-click="tabItemClick('commodityHome')">商品</tab-item>
      <tab-item @on-item-click="tabItemClick('details')">详情</tab-item>
      <tab-item @on-item-click="tabItemClick('sale')">销售记录</tab-item>
      <tab-item @on-item-click="tabItemClick('upload')">上传记录</tab-item>
      <div class="uploadClick" @click="uploadClick">
        <x-icon slot="icon" class="vux-uploadClick" type="ios-cloud-upload-outline"></x-icon>
        <span>上传</span>
      </div>
    </tab>
    
    <mt-tab-container v-model="isSelected" :class="isScroll ? 'vux-container-scroll-top' : ''">
      <mt-tab-container-item id="commodityHome" class="commodityHome-class">
      	
      	<!--商品-->
        <div id="commodityHome-div-height" class="card demo-card-header-pic grid-item-img">
          <div valign="bottom" class="card-header color-white no-border no-padding">
            <mt-swipe :auto="0" :show-indicators="false">
              <mt-swipe-item v-for="cimg in getData.param.commodityImg" :key="cimg.img">
                <img class="lazy-img" v-lazy.vux_view_box_body="cimg.img">
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="card-content">
            <div class="card-content-inner">
              <div class="card-content-inner-div-title">{{getData.param.title}}</div>
              <div class="card-content-inner-div-title color-gray">{{getData.param.content}}</div>
              <div class="card-content-inner-div-money">
                <div class="floatL">
                  <span class="card-content-inner-div-money-symbol">¥ </span>
                  <span class="card-content-inner-div-money-content">{{getData.param.money}}</span>
                </div>
                <div class="floatR">
                  <span class="card-content-inner-div-commodityDate">{{getData.param.commodityDate}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="card-content-inner borderTop">
              <ul>
                <li class="borderTop-li1">月销量<span>1000-1001</span></li>
                <li>浏览<span>14654</span></li>
                <li>下载<span>856</span></li>
                <li>上传<span>654</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <!--详情-->
        <divider>详情</divider>
        <ul class="details-content">
        	<li v-for="src in getData.param.detailsList">
        		<img class="lazy-img" v-lazy.vux_view_box_body="src">
        	</li>
        </ul>

      </mt-tab-container-item>
      
      <!--销售记录-->
      <mt-tab-container-item id="sale">
        sale
      </mt-tab-container-item>
      
      <!--上传记录-->
      <mt-tab-container-item id="upload">
        upload
      </mt-tab-container-item>
      
    </mt-tab-container>
    
    <!--底部菜单栏-->
    <tabbar>
      <tabbar-item class="tabbar-shop" @click.native="shopClick">
        <x-icon slot="icon" type="ios-home-outline"></x-icon>
        <span slot="label">店铺</span>
      </tabbar-item>
      <tabbar-item class="tabbar-collection" @click.native="collectionClick">
        <x-icon v-if="!getData.param.isIosStar" slot="icon" type="ios-star-outline"></x-icon>
        <x-icon v-if="getData.param.isIosStar" class="isIosStar" slot="icon" type="ios-star"></x-icon>
        <span slot="label">收藏</span>
      </tabbar-item>
      <tabbar-item class="tabbar-purchase" @click.native="purchaseClick">
        <span slot="label">立即购买</span>
      </tabbar-item>
      <tabbar-item class="tabbar-shopping" @click.native="shoppingClick">
        <span slot="label">加入购物车</span>
      </tabbar-item>
    </tabbar>
    
    <!--分享工具-->
    <actionsheet v-model="actionsheetShow" :menus="uploadList" @on-click-menu="uploadMenuClick"></actionsheet>

  </div>
</template>

<script>
import { Tab, TabItem, Tabbar, TabbarItem, Divider, Actionsheet } from 'vux'

export default {
  components: {
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    Divider,
    Actionsheet
  },
  data () {
    return {
      isSelected: 'commodityHome', // 默认显示商品信息
      isScroll: false, // 顶部选项卡位置固定
      tabScroll: $('.vux-header.app-vux-header').height(), // 导航栏高度
      commodityHomeScroll: '', // 商品信息高度
      actionsheetShow: false, // 上传选项弹框
      uploadList: { // 上传列表
        friends: '分享朋友圈',
        shop: '上传微店'
      },
      getData: {
        param: { // 获取商品信息
          title: '', // 标题
          content: '', // 内容
          money: '', // 金额
          commodityDate: '', // 上架时间
          commodityImg: [], // 商品图片
          detailsList: [], // 商品详情图片
          isIosStar: false // 商品收藏状态
        }
      }
    }
  },
  activated () {
    this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
    this.getCommodityInformation() // 获取商品信息
    $('.card-header.color-white.no-border.no-padding').css('height', $('#commodity').width()) // 设置商品信息图片高度
    $('.mint-swipe').css('height', $('#commodity').width()) // 设置商品信息图片高度
    this.$store.commit('scrollMutationsTrue') // 开启滚动条监听
  },
  deactivated () {
    this.$destroy() // 销毁
  },
  methods: {
    tabItemClick (val) { // 顶部选项卡切换
      const self = this
      if (val === 'details') {
        self.isSelected = 'commodityHome'
      } else {
        self.isSelected = val
      }
      if (val === 'commodityHome') {
        setTimeout(() => {
          self.$store.commit('setScrollIndexMutations', self.tabScroll)
        }, 0)
      } else if (val === 'details') {
        setTimeout(() => {
          self.$store.commit('setScrollIndexMutations', (self.commodityHomeScroll + self.tabScroll))
        }, 0)
      }
    },
    getCommodityInformation () { // 获取商品信息
      const self = this
      let param = {
        id: self.$store.state.shoppingModules.commodityId
      }
      self.$axioshttp.axios(self, API.mobileTerminal_commodityInformation, param).then(res => {
        $.each(res.data.model.commodityImg, (i, value) => {
          self.getData.param.commodityImg.push({
            img: value
          })
        })
        self.getData.param.title = res.data.model.title
        self.getData.param.content = res.data.model.content
        self.getData.param.money = res.data.model.money
        self.getData.param.commodityDate = res.data.model.commodityDate
        self.getData.param.detailsList = res.data.model.detailsList
        setTimeout(() => {
          self.commodityHomeScroll = $('#commodityHome-div-height').height() // 商品信息高度
        }, 0)
      })
    },
    shopClick () { // 进入店铺
      this.$vux.toast.text('暂未开放', 'middle')
    },
    collectionClick () { // 商品收藏
      this.getData.param.isIosStar = !this.getData.param.isIosStar
      this.$vux.toast.text('暂未开放', 'middle')
    },
    purchaseClick () { // 立即购买
      this.$vux.toast.text('暂未开放', 'middle')
    },
    shoppingClick () { // 加入购物车
      this.$vux.toast.text('暂未开放', 'middle')
    },
    uploadClick () { // 上传按钮
      this.actionsheetShow = true
    },
    uploadMenuClick (key, item) { // 上传类别
      if (key === 'friends') {
        this.$store.commit('scrollMutationsFalse') // 关闭滚动条监听
        this.$router.push({ path: '/wx-friends' })
      } else {
        this.$vux.toast.text('暂未开放', 'middle')
      }
    }
  },
  watch: {
    '$store.state.mainModules.scroll': function (val) { // 设置顶部选项卡位置
      const self = this
      if (val >= self.tabScroll) {
        if (!self.isScroll) {
          self.isScroll = true
        }
      } else {
        if (self.isScroll) {
          self.isScroll = false
        }
      }
    }
  }
}
</script>
