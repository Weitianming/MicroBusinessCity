<style>
  #login{height: calc(100% - 46px); background-color: #FFFFFF;}
  #login .login-header{padding: 30px 48px; font-size: 36px; font-weight: bold;}
  #login .login-content{padding: 10px 48px;}
  #login .weui-cell:before{display: none;}
  #login .vux-x-input.weui-cell.login-vux-input{border-bottom: 1px solid #D9D9D9;/*no*/}
  #login input{font-size: 18px; font-family: "微软雅黑";}
  #login .login-vux-input-labelImg{width: 35px; height: 35px; padding-right: 5px; display:block;}
  #login .login-vux-input-rightImg{margin-right: 0; width: 18px;}
  #login .login-content-forget{text-align: right; padding: 0 48px; color: #5E9BEB;}
  #login .login-content-button{padding: 24px 48px;}
  
  /*忘记密码-手机号*/
  #login .popupPhone{width: 82.2%; background-color:#fff; height: 590px; margin: 0 auto; border-radius: 20px; margin-top: 150px; font-family: "微软雅黑";}
  #login .login-vux-popup-rightImg{float: right; width: 72px;  height: 72px; margin-top: 20px;}
  #login .popupPhone-header{text-align: center; padding: 48px; font-size: 48px; font-weight: bold;}
  #login .popup-button{padding: 0px; margin-top: 52px;}
  #login .popup-button button{font-size: 48px; height: 124px; border-radius: 0 0 20px 20px; padding: 0;}
  
  /*忘记密码-验证码*/
  #login .forget-vux-code-div{padding: 20px 40px;}
  #login .forget-vux-input-code-marginl{margin-left: 40px;}
  #login .forget-vux-input-code{height: 144px; border: 1px solid #5E9BEB;/*no*/ border-radius: 20px;}
  #login .forget-vux-input-code input{text-align: center;}
  #login .forget-vux-code{padding: 0 40px;}
  #login .forget-vux-code-button{padding: 0px; margin-top: 30px;}
  #login .forget-vux-code-button button{font-size: 48px; height: 124px; border-radius: 0 0 20px 20px; padding: 0;}
  
  /*忘记密码-新密码*/
  #login .forget-vux-passsword-div{padding: 20px 96px 30px 96px;}
  #login .bbs{border-bottom: 1px solid #5E9BEB!important; /*no*/}
  #login .forget-vux-passsword{padding: 0 96px; color: #999999;}
  #login .forget-vux-passsword-button{padding: 0px; margin-top: 48px;}
  #login .forget-vux-passsword-button button{font-size: 48px; height: 124px; border-radius: 0 0 20px 20px; padding: 0;}
  
</style>

<template>
  <div id="login">
  	
    <div>
      <div class="login-header">登录</div>
      <div class="login-content">
        <x-input type="text" mask="999 9999 9999" class="login-vux-input" placeholder="用户名" v-model="loginData.loginUsername">
          <img slot="label" class="login-vux-input-labelImg" src="../../static/assets/Rectangle 4.png">
        </x-input>
        <x-input :type="isInputTypePassword" class="login-vux-input" :show-clear="false" placeholder="密码" v-model="loginData.loginPassword">
          <img slot="label" class="login-vux-input-labelImg" src="../../static/assets/Rectangle 4 Copy.png">
          <img v-show="!isRightImg?false:(isInputTypePassword==='text'?false:true)" slot="right" class="login-vux-input-rightImg" :src="img.kj" @click="rightImgClick">
          <img v-show="!isRightImg?false:(isInputTypePassword==='text'?true:false)" slot="right" class="login-vux-input-rightImg" :src="img.nkj" @click="rightImgClick">
        </x-input>
      </div>
      <div class="login-content-forget" @click="forget">忘记密码?</div>
      <div class="login-content-button">
        <x-button type="primary" class="weui-btn_primary" @click.native="loginButton" :show-loading="isLoginShowLoading">登录</x-button>
      </div>
    </div>
    
    <div>
      <!--手机号-->
      <popup v-model="popup.isPopupShow" position="top" :hide-on-blur="false" is-transparent>
        <div class="popupPhone">
          <img class="login-vux-popup-rightImg" src="../../static/assets/car_easy_tip_icon_close.png" @click="popupCloseClick">
          <div class="popupPhone-header">输入手机号
          </div>
          <div class="login-content">
            <x-input type="text" class="login-vux-input" placeholder="请输入手机号" v-model="forgetParams.phone" :show-clear="false"></x-input>
          </div>
          <div class="popup-button">
            <x-button type="primary" :class="[isPopupPhone ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isPopupPhone" @click.native="popupPhoneButton" :show-loading="isPopupPhoneShowLoading">下一步</x-button>
          </div>
        </div>
      </popup>
      
      <!--验证码-->
      <popup v-model="popup.isPopupCodeShow" position="top" :hide-on-blur="false" is-transparent>
        <div class="popupPhone">
          <img class="login-vux-popup-rightImg" src="../../static/assets/car_easy_tip_icon_close.png" @click="popupCloseClick">
          <div class="popupPhone-header">输入验证码</div>
          <div class="forget-vux-code-div">
          	<flexbox :gutter="0">
				      <flexbox-item>
				      	<x-input type="number" class="forget-vux-input-code" v-model="forgetParams.codea" ref="codea" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
				      </flexbox-item>
				      <flexbox-item class="forget-vux-input-code-marginl">
				      	<x-input type="number" class="forget-vux-input-code" v-model="forgetParams.codeb" ref="codeb" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
				      </flexbox-item>
				      <flexbox-item class="forget-vux-input-code-marginl">
				      	<x-input type="number" class="forget-vux-input-code" v-model="forgetParams.codec" ref="codec" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
				      </flexbox-item>
				      <flexbox-item class="forget-vux-input-code-marginl">
				      	<x-input type="number" class="forget-vux-input-code" v-model="forgetParams.coded" ref="coded" :show-clear="false" :max="1" required @on-focus="vuxInputSelect"></x-input>
				      </flexbox-item>
				    </flexbox>
          </div>
          <div class="forget-vux-code">
            <a v-show="forgetTimeData <= 0 ? true : false" type="button" style="color: #5E9BEB;" @click="getCode">获取验证码</a>
            <a v-show="forgetTimeData > 0 ? true : false" type="button" style="color: #BCBCBC;">重新发送({{forgetTimeData}})</a>
          </div>
          <div class="forget-vux-code-button">
            <x-button type="primary" :class="[isPopupCode ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isPopupCode" @click.native="popupCodeButton" :show-loading="isPopupCodeShowLoading">下一步</x-button>
          </div>
        </div>
      </popup>
      
      <!--新密码-->
      <popup v-model="popup.isPopupPassswordShow" position="top" :hide-on-blur="false" is-transparent>
        <div class="popupPhone">
          <img class="login-vux-popup-rightImg" src="../../static/assets/car_easy_tip_icon_close.png" @click="popupCloseClick">
          <div class="popupPhone-header">设置新密码</div>
          <div class="forget-vux-passsword-div">
            <x-input :type="isForgetPasswordType" class="login-vux-input bbs" placeholder="请输入密码" v-model="forgetParams.password" :show-clear="false">
              <img v-show="isForgetRightImg" slot="right" class="login-vux-input-rightImg" src="../../static/assets/kj.png" @click="forgetRightImgClick">
            </x-input>
          </div>
          <div class="forget-vux-passsword">
          	<a type="button">密码由6-15位字母数字组合</a>
          </div>
          <div class="forget-vux-passsword-button">
            <x-button type="primary" :class="[isPopupPasssword ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isPopupPasssword" @click.native="popupPassswordButton" :show-loading="isPopupPasswordShowLoading">完成</x-button>
          </div>
        </div>
      </popup>
      
    </div>
    
  </div>
</template>

<script>
import { XInput, XButton, Popup, Flexbox, FlexboxItem } from 'vux'
import { mapState, mapActions } from 'vuex'
import kj from '@/assets/kj.png'
import nkj from '@/assets/car_easy_list_control_eyeclose_normal.png'

export default {
  components: {
    XInput,
    XButton,
    Popup,
    Flexbox,
    FlexboxItem
  },
  data () {
    return {
      img: {
        kj: kj,
        nkj: nkj
      },
      isInputTypePassword: 'password', // 切换密码是否隐藏
      loginData: { // 登录参数
        loginUsername: '', // 账号
        loginPassword: '' // 密码
      },
      isRightImg: false, // 切换密码是否隐藏图标
      isLoginButton: true, // 是否禁用登录按钮
      isLoginShowLoading: false, // 登录按钮加载
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
        isPopupPassswordShow: false // 设置密码对话框
      },
      isForgetRightImg: false, // 忘记密码-密码是否可见按钮
      isForgetPasswordType: 'password', // 忘记密码-密码是否可见
      isPopupPhone: true, // 忘记密码-手机号对话框按钮
      isPopupCode: true, // 忘记密码-验证码对话框按钮
      isPopupPasssword: true, // 忘记密码-完成按钮
      isPopupPhoneShowLoading: false, // 忘记密码-手机号对话框按钮加载
      isPopupCodeShowLoading: false, // 忘记密码-验证码对话框按钮加载
      isPopupPasswordShowLoading: false // 忘记密码-完成对话框按钮加载
    }
  },
  created () {},
  activated () {
//  this.$store.commit('TITLENAME', '登录')
//  this.$store.commit('MAINBCMUTATIONS', '0')
//  this.$store.commit('ASSIGNMENTTRUE') // 显示注册按钮
  },
  deactivated () {
    const self = this
//  self.$store.commit('ASSIGNMENTFALSE') // 隐藏注册按钮
//  self.$store.commit('MAINBCMUTATIONS', '1')
    self.loginData.loginPassword = ''
  },
  computed: {
    ...mapState({ // vuex辅助函数
      forgetPhoneData: state => state.loginModules.forgetPhoneData, // 忘记密码-手机号
      forgetTimeData: state => state.loginModules.forgetTimeData // 忘记密码-计时
    })
  },
  methods: {
    ...mapActions('state/loginModules', ['assignmentForgetPhone', 'assignmentForgetTime']),
    ...mapActions('state/MainModules', ['loginDataActions', 'userInterfaceActions', 'leaseInterfaceActions']),
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
      self.isLoginShowLoading = true
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
      self.$axioshttp.personal(self, API.mobileTerminal_login, params).then(res => {
        self.isLoginShowLoading = false
        self.loginHandle(res)
      })
    },
    forget () { // 忘记密码
      const self = this
      self.forgetParams.phone = ''
      self.forgetParams.codea = ''
      self.forgetParams.codeb = ''
      self.forgetParams.codec = ''
      self.forgetParams.coded = ''
      self.forgetParams.password = ''
      self.popup.isPopupShow = true
    },
    popupPhoneButton () { // 忘记密码-手机对话框-下一步
      const self = this
      self.isPopupPhoneShowLoading = true
      var params = {
        phone: self.forgetParams.phone
      }
      self.$axioshttp.personal(self, API.mobileTerminal_findPasswordVerifyPhone, params).then(res => {
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
      self.$axioshttp.personal(self, API.mobileTerminal_findPasswordVerifyVerificationCode, params).then(res => {
        self.isPopupCodeShowLoading = false
        self.popup.isPopupCodeShow = false
        self.popup.isPopupPassswordShow = true
        try {
          if (res.data.result === 'success') {
            self.popup.isPopupCodeShow = false
            self.popup.isPopupPassswordShow = true
          } else {
            self.$axioshttp.toastShow(self, res.data.message)
          }
        } catch (e) {
          self.$axioshttp.toastShow(self, '验证码错误')
        }
      })
    },
    popupPassswordButton () { // 忘记密码-设置密码-登录
      const self = this
      self.isPopupPasswordShowLoading = true
      var params = {
        password: self.forgetParams.password
      }
      self.$axioshttp.personal(self, API.mobileTerminal_setUserPasssword, params).then(res => {
        self.isPopupPasswordShowLoading = false
        self.popup.isPopupPassswordShow = false
        self.loginHandle(res)
      })
    },
    loginHandle (res) { // 登录操作
      const self = this
      console.log(JSON.stringify(res))
      if (res.data.result === 'success') {
        self.$store.dispatch('loginDataActions', JSON.stringify(res)) // 本地缓存登录信息
        self.$store.dispatch('mainIndexActions', '1') // 本地缓存主页位置
        $.each(res.data.model.deploySignJson, (i, value) => {
          if (value.deploySign === 'ZKML_COMPANY') {
            self.$store.dispatch('userInterfaceActions', value.url) // 本地缓存用户平台接口
          } else if (value.deploySign === 'ZKML_RENT') {
            self.$store.dispatch('leaseInterfaceActions', value.url) // 本地缓存租赁平台接口
          }
        })
        self.$router.push({ path: '/index/travel' })
      } else {
        self.$axioshttp.alertShow(self, '提示', res.data.message)
      }
    },
    popupCloseClick () { // 关闭对话框
      this.popup.isPopupShow = false
      this.popup.isPopupCodeShow = false
      this.popup.isPopupPassswordShow = false
    },
    getCode () { // 获取验证码
      const self = this
      var params = {
        phone: self.forgetPhoneData
      }
      self.$axioshttp.personal(self, API.mobileTerminal_findPasswordVerifyPhone, params).then(res => {
        self.$store.dispatch('assignmentForgetTime', '60') // 本地缓存计时
      })
    },
    forgetRightImgClick () { // 忘记密码-密码是否可见
      const self = this
      if (self.isForgetPasswordType === 'password') {
        self.isForgetPasswordType = 'text'
      } else {
        self.isForgetPasswordType = 'password'
      }
    },
    vuxInputSelect (val, $event) { // 选中文字内容
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
    },
    'forgetParams.password': function (val) { // 忘记密码-设置密码
      if (this.forgetParams.password !== '') {
        this.isForgetRightImg = true
        if (this.forgetParams.password.length >= 6 && this.forgetParams.password.length <= 15) {
          this.isPopupPasssword = false
        } else {
          this.isPopupPasssword = true
        }
      } else {
        this.isForgetRightImg = false
        this.isPopupPasssword = true
      }
    }
  }
}
</script>
