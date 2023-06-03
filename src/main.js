import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes'
import Print from 'vue-print-nb'
import api from './request/api.js' // 导入api接口
import Vuex from 'vuex'
import store from '@/store.js' // 导入api接口
import Router from 'vue-router'
import * as echarts from 'echarts';

Vue.use(ElementUI)
Vue.use(Print)
Vue.use(Router)

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$echarts = echarts;

document.title = '仓储管理系统'
new Vue({
  router: routes,
  render: h => h(App),
}).$mount('#app')
