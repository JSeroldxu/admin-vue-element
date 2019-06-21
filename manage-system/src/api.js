import Vue from 'vue'
import axios from 'axios'
import CryptoJS from 'crypto-js'

Vue.prototype.$ajax = axios;

axios.defaults.baseURL = '***'; //接口url

axios.defaults.headers.post['Con  tent-Type'] = 'application/json;charset=UTF-8';
/**
 *接口,调用方式 
  this.$api.admin.url(data=>{
     
 },{
    参数名:参数
 })
 */
export const admin = {
  url: (callback, data, error) => {
    let request = {
      url: '**',    //接口名
      method: 'post',
      data: data,
    };
    ajax(callback, request, error);
  }
};


function ajax(callback, request, error) {
  let token = window.sessionStorage.getItem('card.token');
  let api = request.url;
  let version = '1.0.0';
  let device = 'web';
  let timestamp = new Date().getTime();
  let secretKey = CryptoJS.HmacSHA1(device + '\n' + timestamp + '\n' + version, api).toString();
  let accessToken = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse((token == null ? '' : token) + ':' + secretKey));
  if (!request.headers) {
    request.headers = {};
  }
  request.headers['Authorization-Device'] = device;
  request.headers['Authorization-Version'] = version;
  request.headers['Authorization-Timestamp'] = timestamp;
  request.headers['Authorization'] = accessToken;
  if (!request.data) {
    request.data = {};
  }
  axios(request)
    .then((result) => {
      allHandle.handleSuccess(result, callback, error);
    })
    .catch((error) => {
      allHandle.handleCatch(error);
      console.log(error)
    })
}

export const allHandle = {
  handleSuccess() {
  },
  handleCatch() {
  }
};
