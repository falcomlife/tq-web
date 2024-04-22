import order from './views/order/order.vue';
import inStorage from './views/inStorage/inStorage.vue';
import outStorage from './views/outStorage/outStorage.vue';
import processModify from './views/processModify/processModify.vue';
import company from './views/company/company.vue';
import companyinfo from './views/company/companyinfo.vue';
import dict from './views/dict/dict.vue';
import report from './views/report/report.vue';
import login from './views/login.vue';
import Router from 'vue-router'
import Vue from 'vue'

export default new Router({
  mode: 'history',
  base: '/web',
  routes:[
    {
      path: '/login',
      component: login,
      meta: {
        title: 'login',
        keepAlive: false
      }
    },
    {
      path: '/',
      component: report,
      meta: {
        title: 'report',
        keepAlive: true
      }
    },
    {
      path: '/order',
      component: order,
      meta: {
        title: 'order',
        keepAlive: true
      }
    },
    {
      path: '/inStorage',
      component: inStorage,
      meta: {
        title: 'inStorage',
        keepAlive: true
      }
    },
    {
      path: '/outStorage',
      component: outStorage,
      meta: {
        title: 'outStorage',
        keepAlive: true
      }
    },
    {
      path: '/processModify',
      component: processModify,
      meta: {
        title: 'processModify',
        keepAlive: true
      }
    },
    {
      path: '/company',
      component: company,
      meta: {
        title: 'company',
        keepAlive: true,
        level: 1
      },
      children: [
        {
          path: 'info',
          component: companyinfo,
          meta: {
            title: 'companyinfo',
            keepAlive: true,
            level: 2
          }
        },
      ]
    },
    {
      path: '/dict',
      component: dict,
      meta: {
        title: 'dict',
        keepAlive: true
      }
    }
  ]
});
