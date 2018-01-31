<style>
  #shopping .content-padded{margin: 0 0 0 -18px;}
  #shopping .row{margin-left: 0; overflow: inherit;}
  #shopping .row .col-50{width: 50%; margin-left: 0;}
  #shopping .card{margin: 0 0 18px 18px;}
  #shopping .card-content-inner{padding: 0 18px;}
  #shopping .card-content-inner-div-title{margin: 6px 0 0 0; font-size: 28px;/*px*/ overflow: hidden; text-overflow: ellipsis; white-space: nowrap;}
  #shopping .card-content-inner-div-title-span{padding: 1px 8px;/*px*/ border-radius: 10px;/*px*/ font-size: 18px;/*px*/ line-height: 20px;/*px*/ display: inline-block;  background-color: #FFD700;}
  #shopping .color-gray{margin: 0px!important; font-size: 24px;/*px*/}
  #shopping .card-content-inner-div-money{color: red; font-size: 0px;/*px*/}
  #shopping .card-content-inner-div-money-symbol{font-size: 24px;/*px*/}
  #shopping .card-content-inner-div-money-content{font-weight: bold; font-size: 32px;/*px*/}
  
</style>

<template>
  <div id="shopping">

    <div class="content-padded grid-demo">
      <div class="row" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">

        <div class="col-50" v-for="li in listData">
          <div class="card demo-card-header-pic grid-item-img" @click="commodity(li.id)">
            <div valign="bottom" class="card-header color-white no-border no-padding">
              <x-img :default-src="defaultSrc" :src="li.img" :webp-src="`${li.img}?type=webp`" :offset="100" container="#vux_view_box_body" @click.native="imgClick($event)"></x-img>
            </div>
            <div class="card-content">
              <div class="card-content-inner">
                <div class="card-content-inner-div-title">
                  <span class="card-content-inner-div-title-span">{{li.type}}</span>{{li.title}}
                </div>
                <div class="card-content-inner-div-title color-gray">{{li.content}}</div>
                <div class="card-content-inner-div-money">
                  <span class="card-content-inner-div-money-symbol">¥ </span>
                  <span class="card-content-inner-div-money-content">{{li.money}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <load-more tip="正在加载"></load-more>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { XInput, XButton, LoadMore, XImg } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    LoadMore,
    XImg
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
      },
//    defaultSrc: 'https://gd4.alicdn.com/imgextra/i2/704298669/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
      defaultSrc: '../../../static/assets/TB2rx1Be6uhSKJjSspaXXXFgFXa_!!704298669.jpg',
      loading: false // 上拉加载
    }
  },
  activated () {
    for (var i = 0; i < 10; i++) {
      this.listData.push(this.ceshi)
    }
  },
  deactivated () {
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
    },
    imgClick (event) { // 加载图片
      event = event || window.event
      var events = event.target || event.srcElement
      var dataSrc = $(events).attr('data-src')
      if (dataSrc !== null && dataSrc !== undefined) {
        if (dataSrc !== this.defaultSrc) {
          $(events).attr('src', dataSrc)
          $(events).removeAttr('data-src')
        }
      }
    }
  }
}
</script>
