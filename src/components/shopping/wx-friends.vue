<style>
  /*商品样式*/
  #wx-friends .card{margin: 0 auto; box-shadow: 0 0; background-color: #f6f6f6;}
  #wx-friends .card-header.color-white.no-border.no-padding{width: 100%;}
  #wx-friends .mint-swipe{width: 100%; overflow: inherit;}
  #wx-friends .lazy-img{width: 100%;}
  #wx-friends .card-content{margin-top: 12px; background-color: #fff;}
  #wx-friends .card-content-inner-div-title{font-size: 16px;}
  #wx-friends .vux-input-label-placeholder{margin-left: 5px; color: #999999;}
  #wx-friends .vux-input-label-symbol{margin-left: 5px;}
  
  /*底部按钮*/
  #wx-friends .weui-tabbar{position: inherit; height: 45px;}
  #wx-friends .weui-tabbar .weui-btn{color: #fff; background-color: red;}
  #wx-friends .weui-btn{border-radius: 0px!important;}
  #wx-friends .weui-btn:after{display: none;}
</style>

<template>
  <div id="wx-friends" style="height: 100%;">

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
          	<x-input :title="params.profitPatternString + (params.profitPattern === 'fixed' ? ' ￥' : ' %')" type="number" :show-clear="false" v-model="params.profit" @on-enter="vuxInput"></x-input>
          	<x-input :show-clear="false" type="number" v-model="params.actual" placeholder=" ">
          		<div slot="label">
          			<span>实际售卖价格</span>
          			<span class="vux-input-label-placeholder">(拿货价+利润)</span>
          			<span class="vux-input-label-symbol">￥</span>
          		</div>
          	</x-input>
          	<x-input :show-clear="false" type="number" v-model="params.original" placeholder=" ">
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
          	<x-input title="颜色" text-align="right" v-model="params.colour" :show-clear="false" @on-enter="vuxInput"></x-input>
          	<x-input title="尺寸" text-align="right" v-model="params.size" :show-clear="false" @on-enter="vuxInput"></x-input>
          	<x-input title="手机号码" type="tel" mask="999 9999 9999" text-align="right" :max="13" v-model="params.phone" :show-clear="false" @on-enter="vuxInput"></x-input>
          	<x-input title="QQ" text-align="right" v-model="params.qq" :show-clear="false" @on-enter="nextStep"></x-input>
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
        commodityImg: [], // 商品图片
        title: '', // 标题
        showPrice: true, // 是否显示价格
        money: '', // 拿货价
        profitPatternString: '固定利润', // 利润方式名称
        profitPattern: 'fixed', // 利润方式类别
        profit: '', // 利润
        actual: '', // 实际价格
        original: '', // 原价
        colour: '', // 颜色
        size: '', // 尺寸
        phone: '', // 手机号
        qq: '' // QQ号
      },
      isNextStep: false // 下一步按钮状态
    }
  },
  activated () {
    $('.card-header.color-white.no-border.no-padding').css('height', $('#wx-friends').width()) // 设置商品信息图片高度
    this.getCommodityInformation() // 获取商品信息
    this.isNextStep = false
    this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
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
        self.params.colour = res.data.model.colour
        self.params.size = res.data.model.size
        self.params.phone = res.data.model.phone
        self.params.qq = res.data.model.qq
      })
    },
    profitPatternActionsheetClickMenu (key, item) { // 上传类别
      this.params.profitPatternString = item
      this.params.profitPattern = key
    },
    vuxInput () { // 回车按钮
      this.params.title = '111111'
    },
    nextStep () { // 下一步按钮
      if (!this.isNextStep) {
        if (this.verification()) {
          let param = {
            title: this.params.title,
            showPrice: this.params.showPrice,
            profitPattern: this.params.profitPattern,
            profit: this.params.profit,
            actual: this.params.actual,
            original: this.params.original,
            colour: this.params.colour,
            size: this.params.size,
            phone: this.params.phone,
            qq: this.params.qq
          }
          console.log(JSON.stringify(param))
          this.$router.push({ path: '/choice-picture' })
        }
      }
    },
    verification () { // 表单验证
      this.isNextStep = true
      let texts = ''
      if (this.isNextStep) { // 标题验证
        if (this.params.title === '') {
          this.isNextStep = false
          texts = '请填写标题'
        }
      }
      if (this.params.showPrice) { // 是否显示价格
        if (this.isNextStep) { // 利润验证
          if (this.params.profit === '') {
            this.isNextStep = false
            texts = '请填写获得的利润'
          } else if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.params.profit))) {
            this.isNextStep = false
            texts = '请填写正确的利润金额'
          }
        }
        if (this.isNextStep) { // 实际价格验证
          if (this.params.actual === '') {
            this.isNextStep = false
            texts = '请填写实际价格'
          } else if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.params.actual))) {
            this.isNextStep = false
            texts = '请填写正确的实际价格金额'
          }
        }
        if (this.isNextStep) { // 原价验证
          if (this.params.original === '') {
            this.isNextStep = false
            texts = '请填写原价'
          } else if (!(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(this.params.original))) {
            this.isNextStep = false
            texts = '请填写正确的原价金额'
          }
        }
      }
      if (this.isNextStep) { // 颜色验证
        if (this.params.colour === '') {
          this.isNextStep = false
          texts = '请填写颜色'
        }
      }
      if (this.isNextStep) { // 尺寸验证
        if (this.params.size === '') {
          this.isNextStep = false
          texts = '请填写尺寸'
        }
      }
      if (this.isNextStep) { // 手机号验证
        if (this.params.phone === '') {
          this.isNextStep = false
          texts = '请填写您的手机号'
        } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.params.phone.replace(/\s+/g, '')))) {
          this.isNextStep = false
          texts = '请确认您的手机号'
        }
      }
      if (this.isNextStep) { // qq验证
        if (this.params.qq === '') {
          this.isNextStep = false
          texts = '请填写您的QQ号'
        }
      }
      if (this.isNextStep) {
        return true
      } else {
        this.isNextStep = false
        this.$vux.toast.text(texts, 'middle')
        return false
      }
    }
  }
}
</script>
