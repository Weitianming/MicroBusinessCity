<style>
  
  /*基础样式*/
  #choice-picture .card{margin: 0 auto; padding-bottom: 0px; box-shadow: 0 0; background-color: #fff;}
  #choice-picture .card-header.color-white.no-border.no-padding{width: 100%;}
  #choice-picture .card-content{background-color: #fff;}
  #choice-picture .friends-spacing{padding: 20px 30px;}
  #choice-picture .vux-cell-div{height: 60px;}
  #choice-picture .card-content-inner-div-title{font-size: 30px; }
  #choice-picture .vux-whole-select{position: absolute; top: 50px; right: 90px;}
  #choice-picture .vux-whole-select-icon{width: 40px; height: 40px; position: relative; top: 8px; margin-left: 10px;}

  /*图片列表*/
  #choice-picture .vux-previewer-div{margin-top: 20px;}
  #choice-picture .vux-flexbox-div{padding: 16px 0; margin-bottom: 100px; background-color: #DEDEDE;}
  #choice-picture .flex-demo{width: calc(100% - 16px); height: 100%; padding: 8px; position: relative; text-align: center; background-clip: padding-box;}
  #choice-picture .lazy-img{width: 100%; height: 100%;}
  #choice-picture .vux-flexbox-check-icon{width: 40px; height: 40px; position: absolute; padding: 16px; right: 8px;}
  
  /*底部按钮*/
  #choice-picture .weui-tabbar{height: 100px;}
  #choice-picture .weui-tabbar .weui-btn{font-size: 38px; color: #fff; background-color: red;}
  #choice-picture .weui-tabbar .weui-loading{width: 58px!important; height: 58px!important;}
  
  /*图片弹框*/
  #choice-picture-previewer .pswp__top-bar{height: 88px; z-index: 100;}
  #choice-picture-previewer .pswp__counter{height: 88px; padding: 20px; font-size: 32px;}
  #choice-picture-previewer .pswp__button{width: 88px; height: 88px; background-size: 528px 176px; display: none;}
  #choice-picture-previewer .pswp__button--close{background-position: 0 -88px;}
  #choice-picture-previewer .pswp__button--share{background-position: -88px -88px;}
  #choice-picture-previewer .pswp__button--fs{display: none;}
  #choice-picture-previewer .pswp__button--zoom{background-position: -176px 0;}
  #choice-picture-previewer .pswp__preloader{display: none;}
  #choice-picture-previewer .previewer-delete-icon-box{position: fixed; height: 88px; text-align: right; font-size: 32px; color: #fff; z-index: 10000;}
  
</style>

<template>
  <div id="choice-picture" style="height: calc(100% - 100px); background-color: #DEDEDE;">

    <div class="card">
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
            <cell class="friends-spacing vux-cell-div" title="请选择宝贝详情图片">
              全选
              <img class="vux-whole-select-icon" @click="isSelectClick" :src="params.isSelect ? selectType.tick : selectType.defTick" />
            </cell>
          </div>
        </div>
      </div>
    </div>

    <div class="vux-previewer-div">
      <flexbox :gutter="0" wrap="wrap" class="vux-flexbox-div">
        <flexbox-item :span="1/4" v-for="(item, index) in params.img" :key="index">
          <div class="flex-demo">
            <img class="vux-flexbox-check-icon" @click="isMultiSelectClick(index)" :src="item.isSelect ? selectType.tick : selectType.defTick" />
            <img class="lazy-img" v-lazy.vux_view_box_body="item.src" @click="imgPreviewerShow(index)">
          </div>
        </flexbox-item>
      </flexbox>
      <div v-transfer-dom id="choice-picture-previewer">
        <previewer :list="params.img" ref="previewer" :options="options"></previewer>
      </div>
    </div>

    <div class="weui-tabbar">
      <x-button type="primary" :show-loading="isNextStep" @click.native="nextStep">下一步</x-button>
    </div>

  </div>
</template>

<script>
import { Cell, TransferDom, Previewer, Flexbox, FlexboxItem, XButton } from 'vux'
import { mapState, mapActions } from 'vuex'
import defTick from '@/assets/def-tick.png'
import tick from '@/assets/tick.png'

export default {
  directives: {
    TransferDom
  },
  components: {
    Cell,
    Previewer,
    Flexbox,
    FlexboxItem,
    XButton
  },
  data () {
    return {
      selectType: { // 选择框图标
        defTick: defTick, // 未选中状态
        tick: tick // 选中状态
      },
      getData: {
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
      options: {
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.flex-demo')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
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
        img: []
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
    const self = this
//  $('.card-header.color-white.no-border.no-padding').css('height', $('#wx-friends').width())
    setTimeout(() => {
      $('#choice-picture .vux-flexbox-div .vux-flexbox-item .flex-demo').css('height', $('#choice-picture .vux-flexbox-div .vux-flexbox-item .flex-demo').width())
    }, 0)
    self.params.isSelect = false
    self.isNextStep = false
    self.getPicture()
  },
  deactivated () {
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentRegisterPhone', 'assignmentRegisterStage', 'assignmentRegisterTime']),
    getPicture () { // 获取图片
      const self = this
      $.each(self.getData.detailsList, (i, value) => {
        self.params.img.push({
          src: value,
          isSelect: false
        })
      })
    },
    isSelectClick () { // 全选按钮
      const self = this
      self.params.isSelect = !self.params.isSelect
      $.each(self.params.img, (i, value) => {
        value.isSelect = self.params.isSelect
      })
    },
    isMultiSelectClick (index) { // 多选按钮
      const self = this
      var a = 0
      $.each(self.params.img, (i, value) => {
        if (i === index) {
          value.isSelect = !value.isSelect
        }
        if (!value.isSelect) {
          self.params.isSelect = false
        } else {
          a++
        }
      })
      if (self.params.img.length === a) {
        self.params.isSelect = true
      }
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
          self.$router.push({ path: '/share' })
        }, 2000)
      }
    }
  },
  watch: {
  }
}
</script>
