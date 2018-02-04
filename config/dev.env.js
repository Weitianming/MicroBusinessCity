'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
//API_ROOT: '"http://www.yukij.com"' // 测试
  API_ROOT: '"/api"' // 测试
})
