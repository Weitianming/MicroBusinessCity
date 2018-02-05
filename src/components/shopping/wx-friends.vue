<style>
  /*商品样式*/
  #wx-friends .card{margin: 0 auto; padding-bottom: 45px; box-shadow: 0 0; background-color: #f6f6f6;}
  #wx-friends .card-header.color-white.no-border.no-padding{width: 100%;}
  #wx-friends .mint-swipe{width: 100%; overflow: inherit;}
  #wx-friends .lazy-img{width: 100%;}
  #wx-friends .card-content{margin-top: 12px; background-color: #fff;}
  #wx-friends .card-content-inner-div-title{font-size: 16px;}
  #wx-friends .vux-input-label-placeholder{margin-left: 5px; color: #999999;}
  #wx-friends .vux-input-label-symbol{margin-left: 5px;}
  
  /*底部按钮*/
  #wx-friends .weui-tabbar{position: fixed; height: 45px;}
  #wx-friends .weui-tabbar .weui-btn{color: #fff; background-color: red;}
  #wx-friends .weui-btn{border-radius: 0px!important;}
  #wx-friends .weui-btn:after{display: none;}
</style>

<template>
  <div id="wx-friends">

    <div class="card demo-card-header-pic grid-item-img">
    	
      <div valign="bottom" class="card-header color-white no-border no-padding">
        <mt-swipe :auto="0">
          <mt-swipe-item v-for="(cimg, index) in params.commodityImg" :key="index">
            <img class="lazy-img" v-lazy.vux_view_box_body="cimg.img">
          </mt-swipe-item>
        </mt-swipe>
      </div>
      
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<x-textarea title="标题" :max="50" v-model="params.title"></x-textarea>
          	<x-switch title="是否显示价格" :value-map="[false, true]" :inline-desc="params.showPrice ? '显示' : '不显示'" v-model="params.showPrice"></x-switch>
          </div>
        </div>
      </div>
      
      <div v-show="params.showPrice" class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
          	<cell title="拿货价">
          		<div>
          			<span style="color: red;">{{'￥' + params.money}}</span>
          		</div>
          	</cell>
          	<cell is-link title="利润方式" :value="params.profitPatternString" @click.native="getData.profitPatternActionsheet=true"></cell>
          	<x-input :title="params.profitPatternString + (params.profitPattern === 'fixed' ? ' ￥' : ' %')" :show-clear="false"></x-input>
          	<x-input :show-clear="false">
          		<div slot="label">
          			<span>实际售卖价格</span>
          			<span class="vux-input-label-placeholder">(拿货价+利润)</span>
          			<span class="vux-input-label-symbol">￥</span>
          		</div>
          	</x-input>
          	<x-input :show-clear="false">
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
          	<x-input title="颜色" text-align="right" :show-clear="false"></x-input>
          	<x-input title="尺寸" text-align="right" :show-clear="false"></x-input>
          	<x-input title="手机号码" text-align="right" :show-clear="false"></x-input>
          	<x-input title="QQ" text-align="right" :show-clear="false"></x-input>
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
import { mapActions } from 'vuex'

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
        title: '', // 标题
        showPrice: true, // 是否显示价格
        money: '',
        profitPatternString: '固定利润', // 利润方式名称
        profitPattern: 'fixed', // 利润方式类别
        commodityImg: [] // 商品图片
      },
      isNextStep: false // 下一步按钮状态
    }
  },
  activated () {
    this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
    $('.card-header.color-white.no-border.no-padding').css('height', $('#wx-friends').width()) // 设置商品信息图片高度
    this.getCommodityInformation() // 获取商品信息
    this.isNextStep = false
  },
  deactivated () {
    this.$destroy() // 销毁
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentRegisterPhone', 'assignmentRegisterStage', 'assignmentRegisterTime']),
    getCommodityInformation () { // 获取商品信息
      const self = this
      let param = {
        id: self.$store.state.shoppingModules.commodityId
      }
      self.$axioshttp.axios(self, API.mobileTerminal_commodityInformation, param).then(res => {
        $.each(res.data.model.commodityImg, (i, value) => {
          self.params.commodityImg.push({
            img: value
          })
        })
        self.params.title = res.data.model.title
        self.params.money = res.data.model.money
      })
    },
    profitPatternActionsheetClickMenu (key, item) { // 上传类别
      this.params.profitPatternString = item
      this.params.profitPattern = key
    },
    nextStep () { // 下一步按钮
      const self = this
      let is = true
      let texts = ''
      if (!self.isNextStep) {
        self.isNextStep = true
        if (self.params.title !== '') {
          console.log(111)
        } else {
          is = false
          texts = '请填写标题'
        }
        self.isNextStep = false
        if (is) {
          self.$router.push({ path: '/choice-picture' })
        } else {
          this.$vux.toast.text(texts, 'middle')
        }
//      document.activeElement.scrollIntoViewIfNeeded() // 可视区域
//      setTimeout(() => {
//        self.isNextStep = false
//        self.$router.push({ path: '/choice-picture' })
//      }, 0)
      }
    }
  }
}
</script>
