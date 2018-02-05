<style>
  
  /*基础样式*/
  #choice-picture .card{margin: 0 auto; padding-bottom: 0px; box-shadow: 0 0; background-color: #fff;}
  #choice-picture .card-header.color-white.no-border.no-padding{width: 100%;}
  #choice-picture .card-content{background-color: #fff;}
  #choice-picture .card-content-inner-div-title{font-size: 18px;}
  #choice-picture .vux-whole-select-icon{width: 25px; height: 25px; position: relative; top: 5px; margin-left: 10px;}

  /*图片列表*/
  #choice-picture .vux-flexbox-div{padding: 8px 0; margin-bottom: 45px; background-color: #DEDEDE;}
  #choice-picture .flex-demo{width: calc(100% - 8px); height: 100%; padding: 4px; position: relative; text-align: center; background-clip: padding-box;}
  #choice-picture .lazy-img{width: 100%; height: 100%;}
  #choice-picture .vux-flexbox-check-icon{width: 25px; height: 25px; position: absolute; padding: 8px; right: 4px;}
  
  /*底部按钮*/
  #choice-picture .weui-tabbar{position: fixed; height: 45px;}
  #choice-picture .weui-tabbar .weui-btn{color: #fff; background-color: red;}
  #choice-picture .weui-btn{border-radius: 0px!important;}
  #choice-picture .weui-btn:after{display: none;}
</style>

<template>
  <div id="choice-picture" style="height: calc(100% - 100px); background-color: #DEDEDE;">

    <div class="card">
      <div class="card-content">
        <div class="card-content-inner">
          <div class="card-content-inner-div-title">
            <cell class="friends-spacing vux-cell-div" title="请选择宝贝详情图片">全选
              <img class="vux-whole-select-icon" @click="isSelectClick" :src="params.isSelect ? selectType.tick : selectType.defTick" />
            </cell>
          </div>
        </div>
      </div>
    </div>

    <div>
      <flexbox :gutter="0" wrap="wrap" class="vux-flexbox-div">
        <flexbox-item :span="1/4" v-for="(item, index) in params.detailsList" :key="index">
          <div class="flex-demo">
            <img class="vux-flexbox-check-icon" @click="isMultiSelectClick(index)" :src="item.isSelect ? selectType.tick : selectType.defTick" />
            <img class="lazy-img" v-lazy.vux_view_box_body="item.src" @click="imgPreviewerShow(index)">
          </div>
        </flexbox-item>
      </flexbox>
      <div v-transfer-dom id="choice-picture-previewer">
        <previewer :list="params.detailsList" ref="previewer" :options="options"></previewer>
      </div>
    </div>

    <div class="weui-tabbar">
      <x-button type="primary" :show-loading="isNextStep" @click.native="nextStep">下一步</x-button>
    </div>

  </div>
</template>

<script>
import { Cell, TransferDom, Previewer, Flexbox, FlexboxItem, XButton } from 'vux'
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
      params: {
        isSelect: false, // 全选按钮状态
        detailsList: [] // 详情图片
      },
      isNextStep: false, // 下一步按钮状态
      options: { // 查看图片
        getThumbBoundsFn (index) {
          let thumbnail = document.querySelectorAll('.flex-demo')[index]
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          let rect = thumbnail.getBoundingClientRect()
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
        }
      }
    }
  },
  activated () {
    this.$store.commit('setScrollIndexMutations', 0) // 滚动条初始至顶部
    this.params.isSelect = false
    this.isNextStep = false
    this.getPicture() // 获取详情图片
  },
  deactivated () {
    this.params.detailsList = []
    this.$destroy() // 销毁
  },
  methods: {
    getPicture () { // 获取详情图片
      const self = this
      let param = {
        id: self.$store.state.shoppingModules.commodityId
      }
      self.$axioshttp.axios(self, API.mobileTerminal_commodityInformation, param).then(res => {
        $.each(res.data.model.detailsList, (i, value) => {
          self.params.detailsList.push({
            src: value,
            isSelect: false
          })
        })
        setTimeout(() => {
          $('#choice-picture .vux-flexbox-div .vux-flexbox-item .flex-demo').css('height', $('#choice-picture .vux-flexbox-div .vux-flexbox-item .flex-demo').width())
        }, 0)
      })
    },
    isSelectClick () { // 全选按钮
      const self = this
      self.params.isSelect = !self.params.isSelect
      $.each(self.params.detailsList, (i, value) => {
        value.isSelect = self.params.isSelect
      })
    },
    isMultiSelectClick (index) { // 多选按钮
      const self = this
      var a = 0
      $.each(self.params.detailsList, (i, value) => {
        if (i === index) {
          value.isSelect = !value.isSelect
        }
        if (!value.isSelect) {
          self.params.isSelect = false
        } else {
          a++
        }
      })
      if (self.params.detailsList.length === a) {
        self.params.isSelect = true
      }
    },
    imgPreviewerShow (index) { // 放大图片预览
      this.$refs.previewer.show(index)
    },
    nextStep () { // 下一步按钮
      let is = false
      if (!this.isNextStep) {
        this.isNextStep = true
        if (!this.params.isSelect) {
          $.each(this.params.detailsList, (i, value) => {
            if (value.isSelect) {
              is = true
              return false
            }
          })
        } else {
          is = true
        }
        this.isNextStep = false
        if (is) {
          this.$router.push({ path: '/share' })
        } else {
          this.$vux.toast.text('至少选择一张详情图片', 'middle')
        }
      }
    }
  }
}
</script>
