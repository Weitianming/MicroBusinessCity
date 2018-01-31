import ls from '../utils/LStorage'
/**
 * 登录、注册等缓存数据
 */
const lsName = { // 本地缓存名称
  registerStage: 'registerStageData', // 注册-状态
  registerPhone: 'registerPhone', // 注册-手机号
  registerTime: 'registerTime', // 注册-计时
  forgetPhone: 'forgetPhone', // 忘记密码-手机号
  forgetTime: 'forgetTime' // 忘记密码-计时
}

const loginModules = {
  state: { // 唯一数据源
    isHeaderRightData: false, // 标题栏-右边
    registerStageData: ls.getItem(lsName.registerStage) || '0', // 注册-状态
    registerPhoneData: ls.getItem(lsName.registerPhone) || '', // 注册-手机号
    registerTimeData: ls.getItem(lsName.registerTime) || '0', // 注册-计时
    forgetPhoneData: ls.getItem(lsName.forgetPhone) || '', // 忘记密码-手机号
    forgetTimeData: ls.getItem(lsName.forgetTime) || '0' // 忘记密码-计时
  },
  getters: { // 对数据作计算
  },
  mutations: { // 修改数据
    ASSIGNMENTTRUE (state) { // 标题栏-右边显示
      state.isHeaderRightData = true
    },
    ASSIGNMENTFALSE (state) { // 标题栏-右边隐藏
      state.isHeaderRightData = false
    },
    ASSIGNMENTREGISTERSTAGE (state, value) { // 注册-状态
      state.registerStageData = value
    },
    ASSIGNMENTREGISTERPHONE (state, value) { // 注册-手机号
      state.registerPhoneData = value
    },
    ASSIGNMENTREGISTERTIME (state, value) { // 注册-计时
      state.registerTimeData = value
    },
    ASSIGNMENTFORGETPHONE (state, value) { // 忘记密码-手机号
      state.forgetPhoneData = value
    },
    ASSIGNMENTFORGETTIME (state, value) { // 忘记密码-计时
      state.forgetTimeData = value
    }
  },
  actions: { // 数据异步处理
    assignmentRegisterStage ({commit}, value) { // 缓存注册-状态
      commit('ASSIGNMENTREGISTERSTAGE', value)
      ls.setItem(lsName.registerStage, value)
    },
    assignmentRegisterPhone ({commit}, value) { // 缓存注册-手机号
      commit('ASSIGNMENTREGISTERPHONE', value)
      ls.setItem(lsName.registerPhone, value)
    },
    assignmentRegisterTime ({commit, state}, value) { // 缓存注册-计时
      commit('ASSIGNMENTREGISTERTIME', value)
      if (value > 0) {
        var countDownSI = setInterval(() => {
          var a = parseInt(state.registerTimeData)
          var b = --a
          commit('ASSIGNMENTREGISTERTIME', b)
          ls.setItem(lsName.registerTime, b)
          if (state.registerTimeData <= 0) {
            clearInterval(countDownSI)
          }
        }, 1000)
      }
    },
    assignmentForgetPhone ({commit}, value) { // 缓存忘记密码-手机号
      commit('ASSIGNMENTFORGETPHONE', value)
      ls.setItem(lsName.forgetPhone, value)
    },
    assignmentForgetTime ({commit, state}, value) { // 缓存忘记密码-计时
      commit('ASSIGNMENTFORGETTIME', value)
      console.log(value)
      if (value > 0) {
        console.log(111)
        var countDownSI = setInterval(() => {
          var a = parseInt(state.forgetTimeData)
          var b = --a
          commit('ASSIGNMENTFORGETTIME', b)
          ls.setItem(lsName.forgetTime, b)
          if (state.forgetTimeData <= 0) {
            clearInterval(countDownSI)
          }
        }, 1000)
      }
    },
    removeItemRegisterData ({commit}, value) { // 清除注册本地缓存
      if (value !== null && value !== undefined) {
        ls.removeItem(value)
      } else {
        ls.removeItem(lsName.registerStage)
        ls.removeItem(lsName.registerPhone)
        ls.removeItem(lsName.registerTime)
      }
    }
  }
}

export default loginModules
