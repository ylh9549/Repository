import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 组件
import 'element-ui/lib/theme-chalk/index.css' // 样式

import request from "./utils/request"
import local from "@/utils/local"
Vue.prototype.request = request;

import echarts from "echarts"
Vue.prototype.echarts = echarts;


import "./assets/css/base.css"
import { log } from 'util';

Vue.use(ElementUI)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // to: 要进入的目标路由对象  from: 当前导航正要离开的路由 next: 是一个函数 只要调用 才能进入下一步
  // 获取浏览器中的token
  const token = local.get('admin123');
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { // 没有token
    // 如果要去登录 放行
    if (to.path === '/login') {
      next()
    } else {
      // 如果想去其他界面 直接跳转到登录
      next('/login')
    }
  }
})





new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
