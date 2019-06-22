import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'adminLogin',
      component: resolve => require(['@/view/Login'], resolve),
    },
    {
      path: '/index',
      name: 'layoutIndex',
      meta:{
        title:'首页'
      },
      component: resolve => require(['@/layout/index'],resolve),
      children:[
        {
          path: '/index',
          name: 'indexPage',
          meta:{
            title:'首页'
          },
          component: resolve => require(['@/view/index'],resolve)
        },
        {
          path: '/user/manage',
          name: 'userManage',
          meta:{
            title:'用户管理'
          },
          component: resolve => require(['@/view/userManage'],resolve)
        },
        {
          path: '/tailor',
          name: 'tailor',
          meta:{
            title:'裁剪屏幕'
          },
          component: resolve => require(['@/components/tailor'],resolve)
        },
        {
          path: '/richExample',
          name: 'richExample',
          meta:{
            title:'富文本组件'
          },
          component: resolve => require(['@/components/richExample'],resolve)
        },
        {
          path: '/vueCropper',
          name: 'vueCropper',
          meta:{
            title:'裁剪图片'
          },
          component: resolve => require(['@/components/vueCropper'],resolve)
        },
      ]
    },
  ]
})
