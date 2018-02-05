<style>
  /*底部tab*/
  #share .weui-tabbar{position: fixed; height: 60px!important; background-color: #fff; display: inherit;}
  #share .weui-tabbar__item{float: left;}
  #share .weui-tabbar .vux-x-icon{width: 25px; height: 25px;}
  #share .weui-tabbar__label{margin: 0 auto; color: #000; font-size: 15px;}
  #share .weui-tabbar .tabbar-money{width: 40%; padding: 6px 0px 4px 0px;}
  #share .weui-tabbar .tabbar-money .weui-tabbar__label{font-size: 20px; color: red; font-weight: bold;}
  #share .weui-tabbar .tabbar-consultation{width: 29%; padding: 6px 0px 4px 0px; background-color: #fa0;}
  #share .weui-tabbar .tabbar-consultation .weui-tabbar__label{font-size: 18px; color: #fff;}
  #share .weui-tabbar .tabbar-contact{width: calc(31% - 1px);/*no*/ padding: 6px 0px 4px 0px; background-color: #ec3e36;}
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
      <tabbar-item class="tabbar-money">
        <span slot="label">¥ {{params.money}}</span>
      </tabbar-item>
      <tabbar-item class="tabbar-consultation">
        <span slot="label">QQ咨询</span>
      </tabbar-item>
      <tabbar-item class="tabbar-contact">
        <span slot="label">电话联系</span>
      </tabbar-item>
    </tabbar>

  </div>
</template>

<script>
import { Cell, Tabbar, TabbarItem, Divider } from 'vux'

export default {
  components: {
    Cell,
    Tabbar,
    TabbarItem,
    Divider
  },
  data () {
    return {
      isSelected: 'commodityHome', // 这是bug(不能删)
      params: {
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
    this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
    $('.card-header.color-white.no-border.no-padding').css('height', $('#share').width()) // 设置商品信息图片高度
    $('.mint-swipe').css('height', $('#share').width()) // 设置商品信息图片高度
    this.getCommodityInformation() // 获取商品信息
  },
  deactivated () {
    this.$destroy() // 销毁
  },
  methods: {
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
        self.params.detailsList = res.data.model.detailsList
      })
    }
  }
}
</script>
