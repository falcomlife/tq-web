import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes'
import echarts from 'echarts'
import global from './global/global.js'
import Print from 'vue-print-nb'
import api from './request/api.js' // 导入api接口
import Vuex from 'vuex'
import store from '@/store' // 导入api接口

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Print)
Vue.prototype.$echarts = echarts
Vue.prototype.global = global
Vue.prototype.$store = store;
Vue.prototype.$api = api;

const router = new Router({ routes });
document.title = '仓储管理系统'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
