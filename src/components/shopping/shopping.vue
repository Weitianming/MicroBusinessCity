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
import { Grid, GridItem, LoadMore } from 'vux'
import { mapActions } from 'vuex'

export default {
  components: {
    Grid,
    GridItem,
    LoadMore
  },
  data () {
    return {
      isShoppingScroll: false, // 控制当前滚动条位置
      param: {
        office: 0 // 列表数量
      },
      loading: false, // 上拉加载
      listData: [] // 商品列表
    }
  },
  activated () {
    this.isShoppingScroll = false
    if (this.$store.state.mainModules.shoppingScroll <= 0) {
      this.$store.commit('setScrollIndexMutations', 0) // 设置商品页面默认位置
    } else {
      this.isShoppingScroll = true
    }
  },
  deactivated () {
    this.listData = []
    this.$destroy() // 销毁
  },
  methods: {
    ...mapActions('state/shoppingModules', ['commodityIdActions']),
    getCommodityList () { // 获取商品列表
      const self = this
      let param = {
        office: self.param.office
      }
      self.$axioshttp.axios(self, API.mobileTerminal_commodityList, param).then(res => {
        $.each(res.data.model.commodityList, (i, value) => {
          self.listData.push({
            id: value.id,
            type: value.type,
            title: value.title,
            content: value.content,
            money: value.money,
            img: value.img
          })
        })
        setTimeout(() => {
          self.loading = false
          if (self.isShoppingScroll) {
            self.$store.commit('setScrollIndexMutations', self.$store.state.mainModules.shoppingScroll) // 设置商品页面默认位置
            self.isShoppingScroll = false
          }
        }, 0)
      })
    },
    loadMore () { // 上拉加载
      if (!this.loading) {
        this.loading = true
        this.param.office += 10
        this.getCommodityList()
      }
    },
    commodity (id) { // 查看商品
      this.$store.dispatch('commodityIdActions', id) // 本地缓存商品主键
      this.$router.push({ path: '/commodity' })
      this.$store.commit('shoppingScrollMutationsTrue') // 获取当前页面滚动条位置
    }
  }
}
</script>
