<style>
  
  /*商品样式*/
  #wx-friends .card{margin: 0 auto; box-shadow: 0 0;}
  #wx-friends .vux-slider{width: 100%;}
  #wx-friends .card-content-inner{padding: 20px 0 0 0;/*px*/}
  #wx-friends .plr{padding: 0px 32px;/*px*/}
  #wx-friends .vux-switch{height: 80px;/*px*/}
  #wx-friends .weui-switch{width: 120px;/*px*/ height: 60px;/*px*/ border-radius: 40px;/*px*/}
  #wx-friends .weui-switch:before, .weui-switch-cp__box:before {width: 120px;/*px*/ height: 60px;/*px*/ border-radius: 40px;/*px*/}
  #wx-friends .weui-switch:after, .weui-switch-cp__box:after {width: 60px;/*px*/ height: 60px;/*px*/ border-radius: 40px;/*px*/}
  
  
  #wx-friends .card-content-inner-div-title{margin: 0; font-size: 34px;/*px*/ line-height: 36px;/*px*/}
  #wx-friends .color-gray{margin: 40px 0px 20px 0!important; font-size: 28px;/*px*/ line-height: 30px;/*px*/}
  #wx-friends .card-content-inner-div-money{color: #ec3e36; font-size: 0px;/*px*/ overflow: hidden;}
  #wx-friends .floatL{float: left;}
  #wx-friends .floatR{float: right;}
  #wx-friends .card-content-inner-div-money-symbol{font-size: 30px;/*px*/}
  #wx-friends .card-content-inner-div-money-content{font-size: 38px;/*px*/}
  #wx-friends .card-content-inner-div-commodityDate{color: #999; font-size: 28px;/*px*/ line-height: 56px;/*px*/}
  #wx-friends .borderTop{margin: 0 32px;/*px*/ padding: 20px 0;/*px*/ border-top: 1px solid #ccc;/*no*/ font-size: 24px;/*px*/ color: #949494; overflow: hidden;}
  #wx-friends .borderTop li{list-style-type:none; float: left; padding: 0 8px;/*px*/ border-left: 1px solid #ccc;/*no*/ }
  #wx-friends .borderTop span{padding-left: 4px;/*px*/ font-size: 24px;/*px*/ color: #000;}
  #wx-friends .borderTop .borderTop-li1{padding-left: 0!important; border-left: none!important;}
  #wx-friends .borderTop .borderTop-li1 span{color: #f60;}
  
  
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
  <div id="wx-friends">

    <div class="card demo-card-header-pic grid-item-img">
      <div valign="bottom" class="card-header color-white no-border no-padding">
        <swiper :list="ceshi.img" :show-desc-mask="false" :aspect-ratio="414/414" dots-class="custom-bottom" dots-position="center" :show-dots="false"></swiper>
      </div>
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<x-textarea class="plr" title="标题" :max="50" v-model="ceshi.title"></x-textarea>
          	<x-switch class="plr vux-switch" title="是否显示价格" :value-是否显示价格="['0', '1']"></x-switch>
          	<!--<popup-picker title="是否显示价格" :data="[['显示','不显示']]"></popup-picker>-->
          </div>
          <!--<div class="card-content-inner-div-title color-gray plr">{{ceshi.content}}</div>-->
          <!--<div class="card-content-inner-div-money">
            <div class="floatL">
              <span class="card-content-inner-div-money-symbol">¥ </span>
              <span class="card-content-inner-div-money-content">{{ceshi.money}}</span>
            </div>
            <div class="floatR">
              <span class="card-content-inner-div-commodityDate">{{ceshi.commodityDate}}</span>
            </div>
          </div>-->
        </div>
      </div>
      <!--<div class="card-content">
        <div class="card-content-inner borderTop">
          <ul>
            <li class="borderTop-li1">月销量<span>1000-1001</span></li>
            <li>浏览<span>14654</span></li>
            <li>下载<span>856</span></li>
            <li>上传<span>654</span></li>
          </ul>
        </div>
      </div>-->
    </div>

    <actionsheet v-model="actionsheetShow" :menus="uploadList" @on-click-menu="uploadMenuClick"></actionsheet>

  </div>
</template>

<script>
import { Swiper, XTextarea, XSwitch, PopupPicker, Divider, XImg, Actionsheet } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Swiper,
    XTextarea,
    XSwitch,
    PopupPicker,
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
