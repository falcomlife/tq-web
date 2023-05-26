import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes'
import global from './global/global.js'
import Print from 'vue-print-nb'
import api from './request/api.js' // 导入api接口
import Vuex from 'vuex'
import store from '@/store.js' // 导入api接口
import Router from 'vue-router'

Vue.use(ElementUI)
Vue.use(Print)
Vue.use(Router)

Vue.config.productionTip = false
Vue.prototype.global = global
Vue.prototype.$store = store
Vue.prototype.$api = api

document.title = '仓储管理系统'
new Vue({
  router: routes,
  render: h => h(App),
}).$mount('#app')
