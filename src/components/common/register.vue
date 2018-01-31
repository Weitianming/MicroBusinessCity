<style>
  #register .register-vux-input{padding: 0px 0px 8px 0px!important; height: 3rem;}
  #register .register-vux-input{border-bottom: 1px solid #5E9BEB;}
  #register .register-verification{color: #666666; font-size: 1.08rem;}
  #register .weui-cell:before{display: none;}
  #register .weui-btn:after{display: none;}
  #register .weui-icon-success{font-size: 1.1rem;}
  #register .weui-icon-success:before{color: #ff6040!important; margin-left: 0px;}
  #register .weui-icon-circle{font-size: 1.1rem;}
  #register .weui-icon-circle:before{margin-left: 0px;}
</style>

<template>
  <div id="register">
    <!--手机号-->
    <div v-if="registerStageData === '0' ? true : false">
      <div class="login-header">注册</div>
      <div style="padding: 1rem 2rem;">
        <x-input type="text" class="register-vux-input" placeholder="请输入手机号" v-model="params.phone">
        </x-input>
      </div>
      <div style="padding: 0px 2rem; margin-top: 1.5rem;">
        <x-button type="primary" :class="[isRegisterButton ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isRegisterButton" @click.native="registerButton" :show-loading="isRegisterShowLoading">下一步</x-button>
      </div>
    </div>
    <!--验证码-->
    <div v-if="registerStageData === '1' ? true : false">
      <div class="login-header register-verification">请输入发送至以下号码的四位验证码</div>
      <div style="padding: 1rem 2rem; color: #333333; font-size: 1.5rem;">{{registerPhoneData}}</div>
      <div style="padding: 1rem 2rem;">
        <x-input type="text" class="register-vux-input" placeholder="请输入验证码" v-model="params.code" :show-clear="false">
          <a v-show="registerTimeData <= 0 ? true : false" type="button" slot="right" style="color: #5E9BEB;" @click="getCode">获取验证码</a>
          <a v-show="registerTimeData > 0 ? true : false" type="button" slot="right" style="color: #BCBCBC;">重新发送({{registerTimeData}})</a>
        </x-input>
      </div>
      <div style="padding: 0px 2rem; margin-top: 1.5rem;">
        <x-button type="primary" :class="[isRegisterButtonStage ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isRegisterButtonStage" @click.native="registerCodeButton" :show-loading="isStageShowLoading">下一步</x-button>
      </div>
    </div>
    <!--设置密码-->
    <div v-if="registerStageData === '2' ? true : false">
      <div class="login-header">请设置登录密码</div>
      <div style="padding: 1rem 2rem;">
        <x-input :type="isRegisterPasswordType" class="register-vux-input" placeholder="请输入密码" v-model="params.password">
        </x-input>
      </div>
      <div style="padding: 0px 2rem;">
        <check-icon :value.sync="isRegisterPassword" colors="#FF3B3B">密码可见</check-icon>
      </div>
      <div style="padding: 0px 2rem; margin-top: 1.5rem;">
        <span style="display: inline-block; padding: 0.5rem 0px; color: #BCBCBC;">密码由6-15位字母数字组合</span>
        <x-button type="primary" :class="[isRegisterButtonPassword ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isRegisterButtonPassword" @click.native="registerButtonPassword" :show-loading="isPasswordShowLoading">完成</x-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { XInput, XButton, CheckIcon } from 'vux'

export default {
  components: {
    XInput,
    XButton,
    CheckIcon
  },
  data () {
    return {
      params: { // 提交的参数
        phone: '', // 手机号
        code: '', // 验证码
        password: '' // 密码
      },
      isRegisterButton: true, // 是否禁用手机号按钮
      isRegisterButtonStage: true, // 是否禁用验证码按钮
      isRegisterPassword: false, // 密码可见按钮
      isRegisterPasswordType: 'password', // 密码可见状态
      isRegisterButtonPassword: true, // 是否禁用完成按钮
      isRegisterShowLoading: false, // 手机号按钮加载
      isStageShowLoading: false, // 验证码按钮加载
      isPasswordShowLoading: false // 完成按钮加载
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
    if (this.registerTimeData > 0) {
      this.$store.dispatch('assignmentRegisterTime', this.registerTimeData) // 本地缓存计时
    }
  },
  deactivated () {
    this.$store.dispatch('assignmentRegisterStage', '0') // 本地缓存注册阶段
    this.params.phone = ''
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentRegisterPhone', 'assignmentRegisterStage', 'assignmentRegisterTime']),
    registerButton () { // 手机号-下一步按钮事件监听
      const self = this
      self.isRegisterShowLoading = true
      var params = {
        phone: self.params.phone
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_registerVerifyPhone, params).then(res => {
        self.isRegisterShowLoading = false
        if (res.data.result === 'success') {
          self.$store.dispatch('assignmentRegisterPhone', self.params.phone) // 本地缓存手机号
          self.$store.dispatch('assignmentRegisterStage', '1') // 本地缓存注册状态
          self.$store.dispatch('assignmentRegisterTime', '-1') // 本地缓存计时
        } else {
          self.$axioshttp.alertShow(self, '提示', res.data.message)
        }
      })
    },
    getCode () { // 获取验证码
      const self = this
      self.$store.dispatch('assignmentRegisterTime', '60') // 本地缓存计时
      var params = {
        phone: self.registerPhoneData
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_reqPhoneVerificationCode, params).then(res => {
        if (res.data.result !== 'success') {
          self.$store.dispatch('assignmentRegisterTime', '-1') // 本地缓存计时
        }
      })
    },
    registerCodeButton () { // 提交验证码
      const self = this
      self.isStageShowLoading = true
      var params = {
        phone: self.registerPhoneData,
        code: self.params.code
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_verifyVerificationCode, params).then(res => {
        self.isStageShowLoading = false
        if (res.data.result === 'success') {
          self.$store.dispatch('assignmentRegisterTime', '-1') // 本地缓存计时
          self.$store.dispatch('assignmentRegisterStage', '2') // 本地缓存注册状态
        } else {
          self.$axioshttp.alertShow(self, '提示', res.data.message)
        }
      })
    },
    registerButtonPassword () { // 提交密码
      const self = this
      self.isPasswordShowLoading = true
      var params = {
        password: self.params.password
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_doRegister, params).then(res => {
        self.isPasswordShowLoading = false
        if (res.data.result === 'success') {
          self.$axioshttp.toastShow(self, res.data.message)
          self.$store.dispatch('assignmentRegisterStage', '0') // 本地缓存注册状态
          self.$router.go(-1)
        } else {
          self.$axioshttp.alertShow(self, '提示', res.data.message)
        }
      })
    }
  },
  watch: {
    'params.phone': function (val) { // 手机号
      if (/^1(3|4|5|7|8)\d{9}$/.test(this.params.phone)) {
        this.isRegisterButton = false
      } else {
        this.isRegisterButton = true
      }
    },
    'params.code': function (val) { // 验证码
      if (this.params.code !== '') {
        this.isRegisterButtonStage = false
      } else {
        this.isRegisterButtonStage = true
      }
    },
    'isRegisterPassword': function () { // 密码可见状态
      if (this.isRegisterPassword) {
        this.isRegisterPasswordType = 'text'
      } else {
        this.isRegisterPasswordType = 'password'
      }
    },
    'params.password': function () { // 密码
      if (this.params.password.length >= 6 && this.params.password.length <= 15) {
        this.isRegisterButtonPassword = false
      } else {
        this.isRegisterButtonPassword = true
      }
    }
  },
  beforeRouteLeave (to, from, next) { // 返回路由钩子
    const self = this
    next(false) // 禁止返回按钮事件
    if (self.registerStageData === '2') {
      self.$store.dispatch('assignmentRegisterStage', '1') // 本地缓存注册状态
    } else if (self.registerStageData === '1') {
      self.$store.dispatch('assignmentRegisterStage', '0') // 本地缓存注册状态
    } else if (self.registerStageData === '0') {
      next() // 允许返回
    }
  }
}
</script>
