<style>
  
  /*商品样式*/
  #wx-friends .card{margin: 0 auto; box-shadow: 0 0; background-color: #f6f6f6;}
  #wx-friends .card-header.color-white.no-border.no-padding{width: 100%;}
  #wx-friends .mint-swipe{width: 100%; overflow: inherit;}
  #wx-friends .lazy-img{width: 100%;}
  #wx-friends .card-content{margin-top: 25px; background-color: #fff;}
  #wx-friends .friends-spacing{padding: 20px 30px;}
  #wx-friends .card-content-inner-div-title{font-size: 30px; line-height: 36px;}
  #wx-friends .color-gray{margin: 30px 0px 20px 0!important; color: #4f4f4f; font-size: 28px; line-height: 30px;}
  #wx-friends .vux-switch-scale{font-size: 30px; line-height: 36px;}
  #wx-friends .vux-label-desc{font-size: 28px;}
  #wx-friends .weui-cell__ft{line-height: 0;}
  #wx-friends .weui-switch{width: 100px; height: 60px; border-radius: 30px; border: 2px;}
  #wx-friends .weui-switch:after, .weui-switch-cp__box:after {width: 60px; height: 60px; border-radius: 30px;}
  #wx-friends .weui-switch:before, .weui-switch-cp__box:before{width: 0; height: 0;}
  #wx-friends .weui-switch:checked:after, .weui-switch-cp__input:checked ~ .weui-switch-cp__box:after{-webkit-transform: translateX(50px); transform: translateX(50px);}
  #wx-friends .vux-cell-div{height: 60px;}
  #wx-friends .weui-cell.vux-tap-active.weui-cell_access{padding-left: 0; padding-right: 0;}
  #wx-friends .vux-popup-picker-value.vux-cell-value{margin-right: 25px;}
  #wx-friends .weui-cell_access .weui-cell__ft:after{width: 25px; height: 25px; top: -8px;}

  /*滚动列表弹窗*/
  .vux-popup-header{font-size: 38px!important; height: 60px!important;}
  
  
  
  /*#wx-friends .card-content-inner-div-money{color: #ec3e36; overflow: hidden;}
  #wx-friends .floatL{float: left;}
  #wx-friends .floatR{float: right;}
  #wx-friends .card-content-inner-div-money-symbol{font-size: 30px;}
  #wx-friends .card-content-inner-div-money-content{font-size: 38px;}
  #wx-friends .card-content-inner-div-commodityDate{color: #999; font-size: 28px; line-height: 56px;}
  #wx-friends .borderTop{margin: 0 32px; padding: 20px 0; border-top: 1px solid #ccc; color: #949494; font-size: 24px; overflow: auto;}
  #wx-friends .borderTop li{list-style-type:none; float: left; padding: 0 8px; border-left: 1px solid #ccc; }
  #wx-friends .borderTop span{padding-left: 4px;font-size: 24px; color: #000;}
  #wx-friends .borderTop .borderTop-li1{padding-left: 0!important; border-left: none!important;}
  #wx-friends .borderTop .borderTop-li1 span{color: #f60;}*/
  
  
</style>

<template>
  <div id="wx-friends">

    <div class="card demo-card-header-pic grid-item-img">
    	
      <div valign="bottom" class="card-header color-white no-border no-padding">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="cimg in ceshi.img" :key="cimg.img">
            <img class="lazy-img" v-lazy.vux_view_box_body="cimg.img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<x-textarea class="friends-spacing" title="标题" :max="50" v-model="ceshi.title"></x-textarea>
          	<x-switch class="friends-spacing vux-switch-scale" title="是否显示价格" :value-map="[false, true]" :inline-desc="ceshi.showPrice ? '显示' : '不显示'" v-model="ceshi.showPrice"></x-switch>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<cell class="friends-spacing vux-cell-div" title="拿货价">
          		<div>
          			<span style="color: red;">{{'￥' + ceshi.money}}</span>
          		</div>
          	</cell>
          	<popup-picker class="friends-spacing vux-cell-div" title="利润方式" :data="ceshi.profitPatternList" v-model="ceshi.profitPattern"></popup-picker>
          	<x-input class="friends-spacing vux-cell-div" :title="ceshi.profitPattern[0] + ' ￥'" :show-clear="false"></x-input>
          </div>
        </div>
      </div>
      
    </div>
    

    <actionsheet v-model="actionsheetShow" :menus="uploadList" @on-click-menu="uploadMenuClick"></actionsheet>

  </div>
</template>

<script>
import { Group, Cell, XTextarea, XSwitch, PopupPicker, XInput, Actionsheet } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Group,
    Cell,
    XTextarea,
    XSwitch,
    PopupPicker,
    XInput,
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
        showPrice: true, // 是否显示价格
        profitPattern: ['固定利润'], // 利润方式
        profitPatternList: [['固定利润', '百分比']],
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
    $('.card-header.color-white.no-border.no-padding').css('height', $('#wx-friends').width())
  },
  deactivated () {
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
