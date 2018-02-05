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
              <mt-swipe-item v-for="cimg in ceshi.img" :key="cimg.img">
                <img class="lazy-img" v-lazy.vux_view_box_body="cimg.img">
              </mt-swipe-item>
            </mt-swipe>
          </div>
          <div class="card-content">
            <div class="card-content-inner">
              <div class="card-content-inner-div-title">{{ceshi.title}}</div>
            </div>
          </div>
          <div class="card-content">
          	<cell title="颜色" value="啊实打实的"></cell>
          	<cell title="尺寸" value="啊实打实的"></cell>
          	<cell title="联系方式" value="啊实打实的"></cell>
          	<cell title="QQ" value="啊实打实的"></cell>
          </div>
        </div>
        
        <!--商品详情-->
        <divider>商品详情</divider>
        <ul class="details-content">
        	<li v-for="src in ceshi.detailsList">
        		<img class="lazy-img" v-lazy.vux_view_box_body="src">
        	</li>
        </ul>

      </mt-tab-container-item>
    </mt-tab-container>
    
    <!--底部菜单栏-->
    <tabbar>
      <tabbar-item class="tabbar-money">
        <span slot="label">¥ {{ceshi.money}}</span>
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
      isSelected: 'commodityHome', // 主页内容
      isScroll: false, // 顶部tab样式
      actionsheetShow: false, // 上传按钮显示
      tabScroll: $('.vux-header.app-vux-header').height(), // 导航栏高度
      commodityHomeScroll: $('#commodityHome-div-height').height(), // 商品信息高度
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
  activated () {
    const self = this
    this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
    $('.card-header.color-white.no-border.no-padding').css('height', $('#share').width())
    self.commodityHomeScroll = $('#commodityHome-div-height').height() // 商品信息高度
  },
  deactivated () {
    this.$destroy() // 销毁
  },
  methods: {
    uploadMenuClick (key, item) { // 上传类别
      if (key === 'menu1') {
        this.$router.push({ path: '/wx-friends' })
      }
    }
  }
}
</script>
