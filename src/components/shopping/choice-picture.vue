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
  
  
  
  /*基础样式*/
  #choice-picture .card{margin: 0 auto; padding-bottom: 0; box-shadow: 0 0; background-color: #f6f6f6;}
  #choice-picture .card-header.color-white.no-border.no-padding{width: 100%;}
  #choice-picture .card-content{background-color: #fff;}
  #choice-picture .friends-spacing{padding: 20px 30px;}
  #choice-picture .vux-cell-div{height: 60px;}
  #choice-picture .card-content-inner-div-title{font-size: 30px; line-height: 36px;}
  #choice-picture .vux-whole-select{position: relative; top: 2px;}
  #choice-picture .weui-icon.weui_icon_circle.weui-icon-circle{font-size: 42px;}
  #choice-picture .weui-icon.weui_icon_success.weui-icon-success{font-size: 42px;}
  
  /*图片列表*/
  #choice-picture .vux-previewer-div{margin-top: 20px; background-color: #fff;}
  
</style>

<template>
  <div id="choice-picture" style="height: 100%; background-color: #f6f6f6;">
  	
  	<div class="card">
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<cell class="friends-spacing vux-cell-div" title="请选择宝贝详情图片">
          		<div>
          			<span class="vux-whole-select" @click="isSelectClick">全选</span>
          			<check-icon :value.sync="params.isSelect"></check-icon>
          		</div>
          	</cell>
          </div>
        </div>
      </div>
  	</div>
  	
  	<div class="vux-previewer-div">
	    <img class="previewer-demo-img" v-for="(item, index) in previewerList" :src="item.src" width="100" @click="imgPreviewerShow(index)">
	    <div v-transfer-dom>
	      <previewer :list="previewerList" ref="previewer" :options="options">
	      	<template>
	      		<span class="previewer-delete-icon-box">
	      			<img src="http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195117f7vq525071.jpg" width="22" height="22" class="previewer-delete-icon">
	      		</span>
	      	</template>
	      </previewer>
	    </div>
  	</div>
  	
  	
		<!--<previewer ref="previewer" :list="previewerList" :options="options">
		  <template slot="button-after">
		    <span class="previewer-delete-icon-box">
		      <img src="http://pic2.hznzcn.com/hznzcn/20161116/AYG/3tb_161017195117f7vq525071.jpg" width="22" height="22" class="previewer-delete-icon">
		    </span>
		  </template>
		</previewer>-->

    <div class="weui-tabbar">
    	<x-button type="primary" :show-loading="isNextStep" @click.native="nextStep">下一步</x-button>
    </div>
    

  </div>
</template>

<script>
import { CheckIcon, Previewer, TransferDom, Cell, XTextarea, XSwitch, XInput, XButton, Actionsheet } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  directives: {
    TransferDom
  },
  components: {
    CheckIcon,
    Previewer,
    Cell,
    XTextarea,
    XSwitch,
    XInput,
    XButton,
    Actionsheet
  },
  data () {
    return {
      previewerList: [{
        src: 'https://placekitten.com/800/400',
        w: 600,
        h: 400
      }, {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      }],
      options: {
        isClickableElement (el) {
          return /previewer-delete-icon/.test(el.className)
        }
      },
      getData: {
        profitPatternActionsheet: false, // 利润方式弹框
        profitPatternList: { // 利润方式类别
          fixed: '固定利润',
          Percentage: '百分比'
        }
      },
      params: {
        isSelect: false, // 全选按钮状态
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
    this.isNextStep = false
  },
  deactivated () {
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentRegisterPhone', 'assignmentRegisterStage', 'assignmentRegisterTime']),
    isSelectClick () { // 全选按钮
      const self = this
      self.params.isSelect = !self.params.isSelect
    },
    imgPreviewerShow (index) { // 放大图片预览
      this.$refs.previewer.show(index)
    },
    nextStep () { // 下一步按钮
      const self = this
      if (!self.isNextStep) {
        self.isNextStep = true
        setTimeout(() => {
          self.isNextStep = false
//        self.$router.push({ path: '/wx-friends' })
        }, 2000)
      }
    }
  },
  watch: {
  }
}
</script>
