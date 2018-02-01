<style>
	#shopping .content-padded{margin: 0 0 0 -18px;}
	#shopping .weui-grid:before{display: none;}
	#shopping .weui-grid:after{display: none;}
	#shopping .row{overflow: inherit;}
	#shopping .weui-grids{position: inherit; overflow: inherit!important;}
	#shopping .weui-grid{padding: 18px 0 0 18px; background-color: #f6f6f6;}
	#shopping .lazy-img{width: 100%;}
	#shopping .card{background-color: #fff;}
	#shopping .card-content{padding: 0 12px 12px 12px;}
	#shopping .card-content-inner-div-title{color: #4f4f4f; font-size: 30px; line-height: 32px; font-family: helvetica,arial,sans-serif; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
	#shopping .card-content-inner-div-title-type{position: relative; bottom: 3px; margin-right: 10px; padding: 6px 8px 2px 8px; border-radius: 10px; font-size: 18px; line-height: 18px; display: inline-block; background-color: #FFD700;}
	#shopping .color-gray{color: #949494; font-size: 26px; margin-top: 5px;}
	#shopping .card-content-inner-div-money{color: red;}
	#shopping .card-content-inner-div-money-symbol{font-size: 24px;}
	#shopping .card-content-inner-div-money-content{font-weight: bold; font-size: 32px;}
</style>

<template>
  <div id="shopping">
    <div class="content-padded">
      <div class="row" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      	
        <grid :cols="2">
          <grid-item v-for="(li, index) in listData" :key="index">
            <div class="card demo-card-header-pic grid-item-img" @click="commodity(li.id)">
              <div valign="bottom" class="card-header color-white no-border no-padding">
                <img class="lazy-img" v-lazy.vux_view_box_body="li.img">
              </div>
              <div class="card-content">
                <div class="card-content-inner">
                  <div class="card-content-inner-div-title">
                    <span class="card-content-inner-div-title-type">{{li.type}}</span>{{li.title}}
                  </div>
                  <div class="card-content-inner-div-title color-gray">{{li.content}}</div>
                  <div class="card-content-inner-div-money">
                    <span class="card-content-inner-div-money-symbol">¥ </span>
                    <span class="card-content-inner-div-money-content">{{li.money}}</span>
                  </div>
                </div>
              </div>
            </div>
          </grid-item>
        </grid>
        
        <div>
          <load-more tip="正在加载"></load-more>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Grid, GridItem, XInput, LoadMore } from 'vux'
import { mapActions } from 'vuex'

export default {
  components: {
    Grid,
    GridItem,
    XInput,
    LoadMore
  },
  data () {
    return {
      listData: [],
      ceshi: {
        id: '123',
        type: '玩具',
        title: '新品测试黯石撒多按时打算大',
        content: '欧～欧～～Are you 王逗比',
        money: '2689.69',
        img: '//gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg'
//      img: 'https://gd4.alicdn.com/imgextra/i2/704298669/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg'
      },
      defaultSrc: 'https://gd4.alicdn.com/imgextra/i2/704298669/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
//    defaultSrc: '../../../static/assets/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
      loading: false // 上拉加载
    }
  },
  activated () {
    this.$store.commit('setScrollIndexMutations', this.$store.state.mainModules.shoppingScroll)
    for (var i = 0; i < 10; i++) {
      this.listData.push(this.ceshi)
    }
  },
  deactivated () {
    const self = this
    self.$store.commit('shoppingScrollMutationsTrue')
    self.listData = []
  },
  methods: {
    ...mapActions('state/shoppingModules', ['commodityIdActions']),
    loadMore () { // 上拉加载
      const self = this
      self.loading = true
      setTimeout(() => {
        for (let i = 1; i <= 10; i++) {
          self.listData.push(self.ceshi)
        }
        self.loading = false
      }, 0)
    },
    commodity (id) { // 查看商品
      const self = this
      self.$store.dispatch('commodityIdActions', id) // 本地缓存计时
      self.$router.push({ path: '/commodity' })
    }
  }
}
</script>
