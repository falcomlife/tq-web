import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import Router from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css';
import routes from './routes'
import echarts from 'echarts'
import global from '@/global/global.js'
import Print from 'vue-print-nb'
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Router)
Vue.use(Print)
Vue.prototype.$echarts = echarts
Vue.prototype.global = global
const router = new Router({ routes });
document.title = '仓储管理系统'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
