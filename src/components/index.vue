<style>
	body{font-family: "微软雅黑";}
  .login-header{width: 100%; padding: 1.5rem 2rem; font-size: 1.5rem;}
  .login-vux-input{padding: 0px!important; height: 3rem;}
  .login-vux-input{border-bottom: 1px solid #D9D9D9;}
  .login-vux-input-labelImg{width: 1.5rem; height: 1.5rem; padding-right:10px; display:block;}
  .login-vux-input-rightImg{margin-left: .2em; margin-right: .2em; width: 1.01rem;}
  .weui-cell:before{display: none;}
  .weui-btn:after{display: none;}
  .weui-btn_primary {background-color: #3DCC6D!important;}
  .weui-btn_disabled.weui-btn_primary {background-color: #D9D9D9!important;}
  
  
</style>

<template>
  <div id="login">
  	<div class="login-header">登录</div>
  	<div class="login-header">登录</div>
  	<div style="padding: 1rem 2rem;">
  	  <x-input type="text" class="login-vux-input" placeholder="手机号" v-model="loginData.loginUsername">
        <img slot="label" class="login-vux-input-labelImg" :src="img.rectangleCopy">
      </x-input>
  	  <x-input :type="isInputTypePassword" class="login-vux-input" :show-clear="false" placeholder="密码" v-model="loginData.loginPassword">
        <img slot="label" class="login-vux-input-labelImg" :src="img.rectangle">
        <img v-show="isRightImg" slot="right" class="login-vux-input-rightImg" :src="img.kj" @click="rightImgClick">
      </x-input>
  	</div>
  	<div style="padding-left: 2rem; font-size: 0.75rem; color: #5E9BEB;">忘记密码?</div>
  	<div style="padding: 0px 2rem; margin-top: 1.5rem;">
  	  <x-button type="primary" :class="[isLoginButton ? 'weui-btn_disabled' : 'weui-btn_primary']" :disabled="isLoginButton" @click.native="loginButton">登录</x-button>
  	</div>
  </div>
</template>

<script>
import { XInput, XButton, Group, Cell } from 'vux'
import rectangleCopy from '@/assets/Rectangle 4 Copy.png'
import rectangle from '@/assets/Rectangle 4.png'
import kj from '@/assets/kj.png'

export default {
  components: {
    XInput,
    XButton,
    Group,
    Cell
  },
  data () {
    return {
      img: { // 图片
        rectangleCopy: rectangleCopy,
        rectangle: rectangle,
        kj: kj
      },
      isInputTypePassword: 'password', // 切换密码是否隐藏
      loginData: {
        loginUsername: '',
        loginPassword: ''
      },
      isRightImg: false, // 切换密码是否隐藏图标
      isLoginButton: true // 是否禁用登录按钮
    }
  },
  created () {
  },
  methods: {
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
      console.log(self.loginData.loginUsername)
      console.log(self.loginData.loginPassword)
      let dataStr = ''
      var params = {
        username: '18756937223',
        password: 'wlw123456'
      }
      for (let key in params) {
        dataStr += key + '=' + params[key]
      }
      dataStr = dataStr.substr(0, dataStr.length - 1)
      this.$http.post('http://192.168.110.14:8080/mobileTerminal/webchat/webChatLogin?flag=affairs&source=LYX121216&deploySignJson=[%20{%20%22deploySign%22%20:%20%22ZKML_COMPANY%22%20},%20{%20%22deploySign%22%20:%20%22ZKML_RENT%22%20}%20]&belongSource=LYX121216', dataStr).then(res => {
        console.log(111)
      })
//    this.$http.post('http://192.168.110.14:8080/mobileTerminal/webchat/webChatLogin?flag=affairs&username=18756937223&password=wlw123456&source=LYX121216&deploySignJson=[%20{%20%22deploySign%22%20:%20%22ZKML_COMPANY%22%20},%20{%20%22deploySign%22%20:%20%22ZKML_RENT%22%20}%20]&belongSource=LYX121216', {
//    }).then(function (res) {
//      console.log(JSON.stringify(res))
//      console.log(JSON.stringify(res.data.model.deploySignJson))
//    }, function (res) {
//      console.log(333)
//    })
    },
    aa () {
      this.$http.post('http://localhost:8081/userapis/mobileApply/waitApplyInfo?a=http://36.7.87.75:10000&token=' + this.aas, {
      }).then(function (res) {
        console.log(JSON.stringify(res))
      }, function (res) {
        console.log(333)
      })
    },
    bb () {
      this.$http.post('http://localhost:8081/userapis/mvc/app/apply/addApply?a=http://117.71.57.192:60005&token=' + this.aas, {
      }).then(function (res) {
        console.log(JSON.stringify(res))
      }, function (res) {
        console.log(333)
      })
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
    }
  }
}
</script>

