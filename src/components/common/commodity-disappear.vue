<style>
</style>

<template>
  <div id="commodity-disappear">
    <div>
      <msg :title="title" :description="description" :buttons="buttons" :icon="$store.state.commonModules.isDisappear"></msg>
    </div>
  </div>
</template>

<script>
import { Msg, XButton } from 'vux'

export default {
  components: {
    Msg,
    XButton
  },
  data () {
    return {
      title: '', // 标题
      description: '', // 详细内容
      buttons: [{
        type: 'warn',
        text: '首页',
        link: '/shopping'
      }]
    }
  },
  activated () {
    this.inif()
  },
  deactivated () {
    this.$destroy() // 销毁
  },
  methods: {
    inif () { // 初始化
      this.$store.commit('setScrollIndexMutations', 0) // 设置页面默认位置
      if (this.$store.state.commonModules.isDisappear === 'warn') {
        this.title = '商品失效'
        this.description = '该商品已失效，可返回至首页选择其他商品'
      }
    }
  }
}
</script>
