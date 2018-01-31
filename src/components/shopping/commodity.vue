<style>
	/*头部tab*/
  #commodity .vux-tab-scroll-top{position: fixed; width: 100%; top: 0; z-index: 10000;}
  #commodity .vux-container-scroll-top{margin-top: 50px;/*no*/}
  #commodity .uploadClick{position: absolute; right: 30px;/*px*/ top: 150px;/*px*/ line-height: 60px;/*px*/ color: #fff; width: 150px;/*px*/ background-color: #000; z-index: 10000; opacity:0.8; fill: #fff; border-radius: 30px;/*px*/}
  #commodity .vux-uploadClick{margin: 0 0 -13px 15px;/*px*/}
  #commodity span{font-size: 28px;/*px*/}
  
  
  /*底部tab*/
  #commodity .weui-tabbar{height: 50px!important;/*no*/ background-color: #fff; display: inherit;}
  #commodity .weui-tabbar__item{float: left;}
  #commodity .weui-tabbar__label{margin: 0 auto; color: #000; font-size: 24px;/*px*/}
  #commodity .weui-tabbar .tabbar-commodityHome{width: 20%; padding-top: 10px;/*px*/}
  #commodity .weui-tabbar .tabbar-commodityHome .weui-tabbar__icon{display: inherit; width: auto; height: auto;}
  #commodity .weui-tabbar .tabbar-details{width: 20%; padding-top: 10px;/*px*/ border-left: 1px solid #e6e6e6;}
  #commodity .weui-tabbar .tabbar-details .weui-tabbar__icon{display: inherit; width: auto; height: auto;}
  #commodity .weui-tabbar .tabbar-sale{width: 29%; padding-top: 10px;/*px*/ height: 100%; background-color: #ec3e36;}
  #commodity .weui-tabbar .tabbar-sale .weui-tabbar__label{font-size: 36px;/*px*/ line-height: 85px;/*px*/ color: #fff;}
  #commodity .weui-tabbar .tabbar-upload{width: 31%; padding-top: 10px;/*px*/ height: 100%; background-color: #fa0;}
  #commodity .weui-tabbar .tabbar-upload .weui-tabbar__label{font-size: 36px;/*px*/ line-height: 85px;/*px*/ color: #fff;}
  
  /*商品样式*/
  #commodity .card{margin: 0 auto; box-shadow: 0 0;}
  #commodity .vux-slider{width: 100%;}
  #commodity .card-content-inner{padding: 20px 32px;/*px*/}
  #commodity .card-content-inner-div-title{margin: 0; font-size: 34px;/*px*/ line-height: 36px;/*px*/}
  #commodity .color-gray{margin: 40px 0px 20px 0!important; font-size: 28px;/*px*/ line-height: 30px;/*px*/}
  #commodity .card-content-inner-div-money{color: #ec3e36; font-size: 0px;/*px*/ overflow: hidden;}
  #commodity .floatL{float: left;}
  #commodity .floatR{float: right;}
  #commodity .card-content-inner-div-money-symbol{font-size: 30px;/*px*/}
  #commodity .card-content-inner-div-money-content{font-size: 38px;/*px*/}
  #commodity .card-content-inner-div-commodityDate{color: #999; font-size: 28px;/*px*/ line-height: 56px;/*px*/}
  #commodity .borderTop{margin: 0 32px;/*px*/ padding: 20px 0;/*px*/ border-top: 1px solid #ccc;/*no*/ font-size: 24px;/*px*/ color: #949494; overflow: hidden;}
  #commodity .borderTop li{list-style-type:none; float: left; padding: 0 8px;/*px*/ border-left: 1px solid #ccc;/*no*/ }
  #commodity .borderTop span{padding-left: 4px;/*px*/ font-size: 24px;/*px*/ color: #000;}
  #commodity .borderTop .borderTop-li1{padding-left: 0!important; border-left: none!important;}
  #commodity .borderTop .borderTop-li1 span{color: #f60;}
  
  /*分享列表*/
  #commodity .weui-actionsheet__cell.vux-actionsheet-menu-default{padding: 20px 24px;/*px*/ font-size: 32px;/*px*/}
  
.ximg-demo {
  width: 100%;
  height: auto;
}
.ximg-error {
  background-color: yellow;
}
.ximg-error:after {
  content: '加载失败';
  color: red;
}
  
</style>

<template>
  <div id="commodity">

    <tab bar-active-color="red" active-color='#000' id="vux-tab-scroll-top" :class="isScroll ? 'vux-tab-scroll-top' : ''">
      <tab-item selected @on-item-click="tabItemClick('commodityHome')">商品</tab-item>
      <tab-item @on-item-click="tabItemClick('details')">详情</tab-item>
      <tab-item @on-item-click="tabItemClick('sale')">销售记录</tab-item>
      <tab-item @on-item-click="tabItemClick('upload')">上传记录</tab-item>
      <div class="uploadClick" @click="uploadClick">
      	<x-icon slot="icon" class="vux-uploadClick" type="ios-cloud-upload-outline"></x-icon>
      	<span>上传</span>
      </div>
    </tab>

    <tabbar style="position: fixed;">
      <tabbar-item class="tabbar-commodityHome">
        <x-icon slot="icon" type="ios-home-outline"></x-icon>
        <span slot="label">店铺</span>
      </tabbar-item>
      <tabbar-item class="tabbar-details">
        <x-icon slot="icon" type="ios-star-outline"></x-icon>
        <!--<x-icon slot="icon" type="ios-star"></x-icon>-->
        <span slot="label">收藏</span>
      </tabbar-item>
      <tabbar-item class="tabbar-sale">
        <span slot="label">立即购买</span>
      </tabbar-item>
      <tabbar-item class="tabbar-upload">
        <span slot="label">加入购物车</span>
      </tabbar-item>
    </tabbar>

    <mt-tab-container v-model="isSelected" :class="isScroll ? 'vux-container-scroll-top' : ''">
      <mt-tab-container-item id="commodityHome">

        <div id="commodityHome-div-height" class="card demo-card-header-pic grid-item-img">
          <div valign="bottom" class="card-header color-white no-border no-padding">
            <swiper :list="ceshi.img" :show-desc-mask="false" :aspect-ratio="414/414" dots-class="custom-bottom" dots-position="center" :show-dots="false"></swiper>
          </div>
          <div class="card-content">
            <div class="card-content-inner">
              <div class="card-content-inner-div-title">{{ceshi.title}}</div>
              <div class="card-content-inner-div-title color-gray">{{ceshi.content}}</div>
              <div class="card-content-inner-div-money">
              	<div class="floatL">
	              <span class="card-content-inner-div-money-symbol">¥ </span>
	              <span class="card-content-inner-div-money-content">{{ceshi.money}}</span>
              	</div>
              	<div class="floatR">
                  <span class="card-content-inner-div-commodityDate">{{ceshi.commodityDate}}</span>
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
        
        <divider>详情</divider>
		<div v-for="src in ceshi.detailsList" style="background-color:yellow;text-align:center;">
		  <span style="font-size:20px;">Loading</span>
		  <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
		</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>
        <div>asdasd</div>

      </mt-tab-container-item>
      <!--<mt-tab-container-item id="details">
        details
      </mt-tab-container-item>-->
      <mt-tab-container-item id="sale">
        sale
      </mt-tab-container-item>
      <mt-tab-container-item id="upload">
        upload
      </mt-tab-container-item>
    </mt-tab-container>
    
    <actionsheet v-model="actionsheetShow" :menus="uploadList" @on-click-menu="uploadMenuClick"></actionsheet>

  </div>
</template>

<script>
import { Tab, TabItem, Tabbar, TabbarItem, Swiper, Divider, XImg, Actionsheet } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Tab,
    TabItem,
    Tabbar,
    TabbarItem,
    Swiper,
    Divider,
    XImg,
    Actionsheet
  },
  data () {
    return {
      isSelected: 'commodityHome', // 主页内容
      isScroll: false, // 顶部tab样式
      actionsheetShow: false, // 上传按钮显示
      uploadList: {
        menu1: '分享朋友圈',
        menu2: '上传微店'
      },
      ceshi: {
        id: '',
        type: '玩具',
        title: '新品测试黯石撒多按时',
        content: '欧～欧～～Are you 王逗比',
        money: '2689.69',
        commodityDate: '2018-01-01',
        img: [{
          url: 'javascript',
          img: 'https://gd4.alicdn.com/imgextra/i2/704298669/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg'
        }, {
          url: 'javascript',
          img: '//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg'
        }],
        detailsList: [
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195114a3p2525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195114vjnb525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_1610171951148n2x525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195115pc4w525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_16101719511547ff525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_1610171951152pbv525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195117f723525071.jpg',
          'http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195117f7vq525071.jpg'
        ]
      },
//    defaultSrc: 'https://gd4.alicdn.com/imgextra/i2/704298669/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
      defaultSrc: '../../../static/assets/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
      loading: false // 上拉加载
    }
  },
  computed: {
    ...mapState({ // vuex辅助函数
      registerStageData: state => state.loginModules.registerStageData, // 注册状态
      registerPhoneData: state => state.loginModules.registerPhoneData, // 输入的手机号
      registerTimeData: state => state.loginModules.registerTimeData // 倒计时
    })
  },
  activated () {
    this.$store.commit('scrollMutationsTrue')
  },
  deactivated () {
    this.$store.commit('scrollMutationsFalse')
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentRegisterPhone', 'assignmentRegisterStage', 'assignmentRegisterTime']),
    tabItemClick (val) { // tab切换
      const self = this
      if (val === 'commodityHome') {
        self.isSelected = 'commodityHome'
        self.$store.commit('setScrollIndexMutations', 40)
      } else if (val === 'details') {
        self.isSelected = 'commodityHome'
        self.$store.commit('setScrollIndexMutations', $('#commodityHome-div-height').height() + 40)
      } else if (val === 'sale') {
        self.isSelected = 'sale'
      } else if (val === 'upload') {
        self.isSelected = 'upload'
      }
    },
    uploadClick () { // 上传按钮
      const self = this
      self.actionsheetShow = true
    },
    uploadMenuClick (key, item) { // 上传类别
      if (key === 'menu1') {
        this.$router.push({ path: '/wx-friends' })
      }
    },
    success (src, ele) {
      console.log('success load', src)
      const span = ele.parentNode.querySelector('span')
      ele.parentNode.removeChild(span)
    },
    error (src, ele, msg) {
      console.log('error load', msg, src)
      const span = ele.parentNode.querySelector('span')
      span.innerText = 'load error'
    }
  },
  watch: {
    '$store.state.mainModules.scroll': function (val) { // 是否监听滚动条
      const self = this
      if (val >= 40) {
        self.isScroll = true
      } else {
        self.isScroll = false
      }
    }
  }
}
</script>
