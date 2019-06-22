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
import * as api from './Api'
Vue.prototype.$api = api;

Vue.config.productionTip = false
api.allHandle.handleSuccess = function (response, callback,error) {
  let body = response.data;

  switch (body.event){
    case 'SUCCESS':
      if(callback){
        callback(body.data);
      }
      break;
    case 'ERROR':
      Vue.prototype.$notify.error({
        title: 'Error',
        message: body.describe
      });
      if(error){
        error(body);
      }
      break;
    case 'RANGE_NOT_SUPPORTED':
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
      if(error){
        error(body);
      }
      break;
    case 'EXCEPTION':
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
      if(error){
        error(body);
      }
      break;
    case 'UNAUTHORIZED':
      router.push({name:'userlogin'});
      break;
    default:
      Vue.prototype.$notify.error({
        title: '操作提示',
        message: body.describe
      });
  }
};
api.allHandle.handleCatch = function (error) {
  console.log(error);
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
