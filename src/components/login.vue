<style>
  #login .login-vux-input{padding: 0px!important; height: 3rem;}
  #login .login-vux-input{border-bottom: 1px solid #D9D9D9;}
  #login .forget-vux-input{padding: 0px!important; height: 3rem;}
  #login .forget-vux-input{border-bottom: 1px solid #5E9BEB;}
  #login .login-vux-input-labelImg{width: 1.5rem; height: 1.5rem; padding-right:10px; display:block;}
  #login .login-vux-input-rightImg{margin-left: .2em; margin-right: .2em; width: 1.01rem;}
  #login .popupPhone{width: 82.2%; background-color:#fff; height: 13rem; margin: 0 auto; border-radius:5px; margin-top: 4rem;}
  #login .popupPhone-header{text-align: center; padding: 1.2rem; font-size: 1rem;}
  #login .popupPhone-button{border-top-left-radius: 0px!important; border-top-right-radius: 0px!important;}
  #login .forget-vux-input-code{float: left; width: 20%; height: 3rem; border: 1px solid #5E9BEB; padding: 0px;}
  #login .forget-vux-input-code-width{margin-left: 5%;}
  #login .forget-vux-input-code input{width: 20%; padding: 0px 1.2rem;}
  #login .weui-cell:before{display: none;}
  #login .weui-btn:after{display: none;}
</style>

<template>
  <div id="login">
    <div>
      <div class="login-header">登录</div>
      <div style="padding: 1rem 2rem;">
        <x-input type="text" class="login-vux-input" placeholder="手机号" v-model="loginData.loginUsername">
          <img slot="label" class="login-vux-input-labelImg" src="../../static/assets/Rectangle 4 Copy.png">
        </x-input>
        <x-input :type="isInputTypePassword" class="login-vux-input" :show-clear="false" placeholder="密码" v-model="loginData.loginPassword">
          <img slot="label" class="login-vux-input-labelImg" src="../../static/assets/Rectangle 4.png">
          <img v-show="isRightImg" slot="right" class="login-vux-input-rightImg" src="../../static/assets/kj.png" @click="rightImgClick">
        </x-input>
      </div>
      <div style="padding-left: 2rem; font-size: 0.75rem; color: #5E9BEB;" @click="forget">忘记密码?</div>
      <div style="padding: 0px 2rem; margin-top: 1.5rem;">
        <x-button type="primary" :class="[isLoginButton ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isLoginButton" @click.native="loginButton">登录</x-button>
      </div>
    </div>
    <div>
    	<!--手机号-->
      <popup v-model="popup.isPopupShow" position="top" :hide-on-blur="false" is-transparent>
        <div class="popupPhone">
        	<div class="popupPhone-header">输入手机号</div>
		      <div style="padding: 1rem 2rem;">
		        <x-input type="text" class="forget-vux-input" placeholder="请输入手机号" v-model="forgetParams.phone" :show-clear="false">
		        </x-input>
		      </div>
		      <div style="padding: 0px; margin-top: 1.33rem;">
		        <x-button class="popupPhone-button" type="primary" :class="[isPopupPhone ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isPopupPhone" @click.native="popupPhoneButton" :show-loading="isPopupPhoneShowLoading">下一步</x-button>
		      </div>
        </div>
      </popup>
    	<!--验证码-->
      <popup v-model="popup.isPopupCodeShow" position="top" :hide-on-blur="false" is-transparent>
        <div class="popupPhone">
        	<div class="popupPhone-header">输入验证码</div>
		      <div style="padding: 0rem 2rem; height: 3.37rem;">
		        <x-input type="number" class="forget-vux-input-code" v-model="forgetParams.codea" ref="codea" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
		        <x-input type="number" class="forget-vux-input-code forget-vux-input-code-width" v-model="forgetParams.codeb" ref="codeb" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
		        <x-input type="number" class="forget-vux-input-code forget-vux-input-code-width" v-model="forgetParams.codec" ref="codec" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
		        <x-input type="number" class="forget-vux-input-code forget-vux-input-code-width" v-model="forgetParams.coded" ref="coded" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
		      </div>
		      <div style="padding: 0.81rem 2rem 0px 2rem;">
		      	<a v-show="forgetTimeData <= 0 ? true : false" type="button" style="color: #5E9BEB;" @click="getCode">获取验证码</a>
            <a v-show="forgetTimeData > 0 ? true : false" type="button" style="color: #BCBCBC;">重新发送({{forgetTimeData}})</a>
		      </div>
		      <div style="padding: 0px; margin-top: 1.02rem;">
		        <x-button class="popupPhone-button" type="primary" :class="[isPopupCode ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isPopupCode" @click.native="popupCodeButton" :show-loading="isPopupCodeShowLoading">下一步</x-button>
		      </div>
        </div>
      </popup>
    	<!--新密码-->
      <popup v-model="popup.isPopupPassswordShow" position="top" :hide-on-blur="false" is-transparent>
        <div class="popupPhone">
        	<div class="popupPhone-header">设置新密码</div>
		      <div style="padding: 1rem 2rem;">
		        <x-input :type="isForgetPasswordType" class="register-vux-input" placeholder="请输入密码" v-model="forgetParams.password">
		        </x-input>
		      </div>
		      <div style="padding: 0px; margin-top: 1.02rem;">
		        <x-button class="popupPhone-button" type="primary" :class="[isPopupCode ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isPopupCode" @click.native="popupCodeButton" :show-loading="isPopupCodeShowLoading">完成</x-button>
		      </div>
        </div>
      </popup>
    </div>
  </div>
</template>

<script>
import { XInput, XButton, Popup } from 'vux'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    XInput,
    XButton,
    Popup
  },
  data () {
    return {
      mas: '',
      isInputTypePassword: 'password', // 切换密码是否隐藏
      loginData: { // 登录参数
        loginUsername: '', // 账号
        loginPassword: '' // 密码
      },
      isRightImg: false, // 切换密码是否隐藏图标
      isLoginButton: true, // 是否禁用登录按钮
      forgetParams: { // 忘记密码参数
        phone: '', // 手机号
        codea: '', // 验证码1
        codeb: '', // 验证码2
        codec: '', // 验证码3
        coded: '', // 验证码4
        password: '' // 设置密码
      },
      popup: { // 忘记密码对话框
        isPopupShow: false, // 手机号对话框
        isPopupCodeShow: false, // 验证码对话框
        isPopupPassswordShow: true // 设置密码对话框
      },
      isForgetPasswordType: 'password', // 密码是否可见
      isPopupPhone: true, // 手机号对话框按钮
      isPopupCode: true, // 验证码对话框按钮
      isPopupPhoneShowLoading: false, // 手机号对话框按钮加载
      isPopupCodeShowLoading: false // 验证码对话框按钮加载
    }
  },
  created () {},
  activated () {
    this.$store.commit('ASSIGNMENTTRUE') // 显示注册按钮
  },
  deactivated () {
    this.$store.commit('ASSIGNMENTFALSE') // 隐藏注册按钮
    this.loginData.loginPassword = ''
  },
  computed: {
    ...mapState({ // vuex辅助函数
      forgetPhoneData: state => state.loginModules.forgetPhoneData, // 忘记密码-手机号
      forgetTimeData: state => state.loginModules.forgetTimeData // 忘记密码-计时
    })
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentForgetPhone', 'assignmentForgetTime']),
    rightImgClick () { // 切换密码是否隐藏图标
      const self = this
      if (self.isInputTypePassword === 'password') {
        self.isInputTypePassword = 'text'
      } else {
        self.isInputTypePassword = 'password'
      }
    },
    loginButton () { // 登录按钮事件监听
      const self = this
      var params = {
        username: self.loginData.loginUsername,
        password: self.loginData.loginPassword,
        source: 'LYX121216',
        belongSource: 'LYX121216',
        deploySignJson: [{
          deploySign: 'ZKML_COMPANY'
        }, {
          deploySign: 'ZKML_RENT'
        }]
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_login, params).then(res => {
        console.log(JSON.stringify(res))
      })
    },
    forget () { // 忘记密码
      const self = this
      self.popup.isPopupShow = true
    },
    popupPhoneButton () { // 忘记密码-手机对话框-下一步
      const self = this
      self.isPopupPhoneShowLoading = true
      var params = {
        phone: self.forgetParams.phone
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_findPasswordVerifyPhone, params).then(res => {
        console.log(JSON.stringify(res))
        self.isPopupPhoneShowLoading = false
        self.popup.isPopupShow = false
        if (res.data.result === 'success') {
          self.popup.isPopupCodeShow = true
          self.$axioshttp.toastShow(self, res.data.message)
          self.$store.dispatch('assignmentForgetTime', '60') // 本地缓存计时
          self.$store.dispatch('assignmentForgetPhone', self.forgetParams.phone) // 本地缓存手机号
        } else {
          self.$axioshttp.alertShow(self, '提示', res.data.message)
        }
      })
    },
    popupCodeButton () { // 忘记密码-验证码对话框-下一步
      const self = this
      self.isPopupCodeShowLoading = true
      var params = {
        phone: self.forgetPhoneData,
        code: `${self.forgetParams.codea}${self.forgetParams.codeb}${self.forgetParams.codec}${self.forgetParams.coded}`
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_findPasswordVerifyVerificationCode, params).then(res => {
        console.log(JSON.stringify(res))
        self.isPopupCodeShowLoading = false
        self.popup.isPopupPassswordShow = true
        if (res.data.result === 'success') {
        } else {
          self.$axioshttp.alertShow(self, '提示', res.data.message)
        }
      })
    },
    popupPassswordButton () { // 忘记密码-设置密码-登录
      const self = this
      self.isPopupCodeShowLoading = true
      var params = {
        phone: self.forgetPhoneData,
        code: `${self.forgetParams.codea}${self.forgetParams.codeb}${self.forgetParams.codec}${self.forgetParams.coded}`
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_findPasswordVerifyVerificationCode, params).then(res => {
        console.log(JSON.stringify(res))
        self.isPopupCodeShowLoading = false
        self.popup.isPopupCodeShow = false
        if (res.data.result === 'success') {
        } else {
          self.$axioshttp.alertShow(self, '提示', res.data.message)
        }
      })
    },
    getCode () { // 获取验证码
      const self = this
      var params = {
        phone: self.forgetPhoneData
      }
      self.$axioshttp.personal(self, global.API.mobileTerminal_findPasswordVerifyPhone, params).then(res => {
        self.$store.dispatch('assignmentForgetTime', '60') // 本地缓存计时
      })
    },
    vuxInputSelect (val, $event) {
      $event.target.select()
    }
  },
  watch: {
    'loginData.loginUsername': function (val) { // 账号输入监听
      if (this.loginData.loginUsername !== '' && this.loginData.loginPassword !== '') {
        this.isLoginButton = false
      } else {
        this.isLoginButton = true
      }
    },
    'loginData.loginPassword': function (val) { // 密码输入框监听
      if (this.loginData.loginPassword !== '') { // 切换密码是否隐藏
        this.isRightImg = true
        if (this.loginData.loginUsername !== '') {
          this.isLoginButton = false
        } else {
          this.isLoginButton = true
        }
      } else {
        this.isRightImg = false
        this.isLoginButton = true
      }
    },
    'forgetParams.phone': function (val) { // 忘记密码-手机号监听
      if (/^1(3|4|5|7|8)\d{9}$/.test(this.forgetParams.phone)) {
        this.isPopupPhone = false
      } else {
        this.isPopupPhone = true
      }
    },
    'forgetParams.codea': function (val) { // 忘记密码-验证码1
      if (this.forgetParams.codea.length <= 1) {
        if (/^[0-9]$/.test(this.forgetParams.codea)) {
          this.$refs.codea.blur()
          this.$refs.codeb.focus()
          if (this.forgetParams.codeb !== '' && this.forgetParams.codec !== '' && this.forgetParams.coded !== '') {
            this.isPopupCode = false
          }
        } else {
          this.isPopupCode = true
          this.forgetParams.codea = ''
        }
      } else {
        this.isPopupCode = true
        var a = this.forgetParams.codea.substring(0, 1)
        this.forgetParams.codea = a
      }
    },
    'forgetParams.codeb': function (val) { // 忘记密码-验证码2
      if (this.forgetParams.codeb.length <= 1) {
        if (/^[0-9]$/.test(this.forgetParams.codeb)) {
          this.$refs.codeb.blur()
          this.$refs.codec.focus()
          if (this.forgetParams.codea !== '' && this.forgetParams.codec !== '' && this.forgetParams.coded !== '') {
            this.isPopupCode = false
          }
        } else {
          this.isPopupCode = true
          this.forgetParams.codeb = ''
        }
      } else {
        this.isPopupCode = true
        var a = this.forgetParams.codeb.substring(0, 1)
        this.forgetParams.codeb = a
      }
    },
    'forgetParams.codec': function (val) { // 忘记密码-验证码3
      if (this.forgetParams.codec.length <= 1) {
        if (/^[0-9]$/.test(this.forgetParams.codec)) {
          this.$refs.codec.blur()
          this.$refs.coded.focus()
          if (this.forgetParams.codea !== '' && this.forgetParams.codeb !== '' && this.forgetParams.coded !== '') {
            this.isPopupCode = false
          }
        } else {
          this.isPopupCode = true
          this.forgetParams.codec = ''
        }
      } else {
        this.isPopupCode = true
        var a = this.forgetParams.codec.substring(0, 1)
        this.forgetParams.codec = a
      }
    },
    'forgetParams.coded': function (val) { // 忘记密码-验证码4
      if (this.forgetParams.coded.length <= 1) {
        if (/^[0-9]$/.test(this.forgetParams.coded)) {
          this.$refs.coded.blur()
          if (this.forgetParams.codea !== '' && this.forgetParams.codeb !== '' && this.forgetParams.codec !== '') {
            this.isPopupCode = false
          }
        } else {
          this.isPopupCode = true
          this.forgetParams.coded = ''
        }
      } else {
        this.isPopupCode = true
        var a = this.forgetParams.coded.substring(0, 1)
        this.forgetParams.coded = a
      }
    }
  }
}
</script>
