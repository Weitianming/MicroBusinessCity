<style>
  
  /*商品样式*/
  #wx-friends .card{margin: 0 auto; padding-bottom: 100px; box-shadow: 0 0; background-color: #f6f6f6;}
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
  #wx-friends .vux-cell-box:not(:first-child):before {display: none;}
  #wx-friends .vux-link-r{padding: 20px 30px!important;}
  #wx-friends .vux-link-r .weui-cell__ft{width: 200px; margin-right: 30px;}
  #wx-friends .vux-link-r .weui-cell__ft:after{left: 210px;}
  #wx-friends .vux-input-label-placeholder{margin-left: 20px; color: #999999;}
  #wx-friends .vux-input-label-symbol{margin-left: 20px;}
  
  /*底部按钮*/
  #wx-friends .weui-tabbar{height: 100px;}
  #wx-friends .weui-tabbar .weui-btn{font-size: 38px; color: #fff; background-color: red;}
  #wx-friends .weui-tabbar .weui-loading{width: 58px!important; height: 58px!important;}
  
  
  
  /*列表弹窗*/
  #wx-friends .weui-actionsheet{width: 80%!important;}
  #wx-friends .weui-actionsheet__cell{font-size: 32px!important; padding: 20px 30px!important;}
  
  
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
          <mt-swipe-item v-for="cimg in params.img" :key="cimg.img">
            <img class="lazy-img" v-lazy.vux_view_box_body="cimg.img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<x-textarea class="friends-spacing" title="标题" :max="50" v-model="params.title"></x-textarea>
          	<x-switch class="friends-spacing vux-switch-scale" title="是否显示价格" :value-map="[false, true]" :inline-desc="params.showPrice ? '显示' : '不显示'" v-model="params.showPrice"></x-switch>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<cell class="friends-spacing vux-cell-div" title="拿货价">
          		<div>
          			<span style="color: red;">{{'￥' + params.money}}</span>
          		</div>
          	</cell>
          	<cell class="friends-spacing vux-cell-div vux-link-r" is-link title="利润方式" :value="params.profitPatternString" @click.native="getData.profitPatternActionsheet=true"></cell>
          	<x-input class="friends-spacing vux-cell-div" :title="params.profitPatternString + (params.profitPattern === 'fixed' ? ' ￥' : ' %')" :show-clear="false"></x-input>
          	<x-input class="friends-spacing vux-cell-div" :show-clear="false">
          		<div slot="label">
          			<span>实际售卖价格</span>
          			<span class="vux-input-label-placeholder">(拿货价+利润)</span>
          			<span class="vux-input-label-symbol">￥</span>
          		</div>
          	</x-input>
          	<x-input class="friends-spacing vux-cell-div" :show-clear="false">
          		<div slot="label">
          			<span>自定义原价</span>
          			<span class="vux-input-label-placeholder">(不填则不显示)</span>
          			<span class="vux-input-label-symbol">￥</span>
          		</div>
          	</x-input>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<x-input class="friends-spacing vux-cell-div" title="颜色" text-align="right" :show-clear="false"></x-input>
          	<x-input class="friends-spacing vux-cell-div" title="尺寸" text-align="right" :show-clear="false"></x-input>
          	<x-input class="friends-spacing vux-cell-div" title="手机号码" text-align="right" :show-clear="false"></x-input>
          	<x-input class="friends-spacing vux-cell-div" title="QQ" text-align="right" :show-clear="false"></x-input>
          </div>
        </div>
      </div>
      
    </div>
    
    <div class="weui-tabbar">
    	<x-button type="primary" :show-loading="isNextStep" @click.native="nextStep">下一步</x-button>
    </div>
    
		<actionsheet v-model="getData.profitPatternActionsheet" :menus="getData.profitPatternList" theme="android" @on-click-menu="profitPatternActionsheetClickMenu"></actionsheet>

  </div>
</template>

<script>
import { Cell, XTextarea, XSwitch, XInput, XButton, Actionsheet } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Cell,
    XTextarea,
    XSwitch,
    XInput,
    XButton,
    Actionsheet
  },
  data () {
    return {
      getData: {
        profitPatternActionsheet: false, // 利润方式弹框
        profitPatternList: { // 利润方式类别
          fixed: '固定利润',
          Percentage: '百分比'
        }
      },
      params: {
        id: '',
        title: '新品测试黯石撒多按时', // 标题
        showPrice: true, // 是否显示价格
        money: '2689.69',
        profitPatternString: '固定利润', // 利润方式名称
        profitPattern: 'fixed', // 利润方式类别
        content: '欧～欧～～Are you 王逗比',
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
      isNextStep: false // 下一步按钮状态
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
    profitPatternActionsheetClickMenu (key, item) { // 上传类别
      const self = this
      self.params.profitPatternString = item
      self.params.profitPattern = key
    },
    nextStep () {
      const self = this
      self.isNextStep = !self.isNextStep
    }
  },
  watch: {
  }
}
</script>
