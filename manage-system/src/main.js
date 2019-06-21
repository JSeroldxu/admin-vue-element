// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
// 兼容性处理
import 'babel-polyfill'
import promise from 'es6-promise'
require('es6-promise').polyfill()
promise.polyfill()
// 调用接口api
import * as api from './api'
Vue.prototype.$api = api;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
