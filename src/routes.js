import order from './views/order/order.vue';
import inStorage from './views/inStorage/inStorage.vue';
import outStorage from './views/outStorage/outStorage.vue';
import dict from './views/dict/dict.vue';
import report from './views/report/report.vue';
import index from './views/index.vue';
import login from './views/login.vue';

const routes = [
  {
    path: '/',
    component: index,
    meta: {
      title: 'index'
    }
  },
  {
    path: '/login',
    component: login,
    meta: {
      title: 'login'
    }
  },
  {
    path: '/order',
    component: order,
    meta: {
      title: 'order'
    }
  },
  {
    path: '/inStorage',
    component: inStorage,
    meta: {
      title: 'inStorage'
    }
  },
  {
    path: '/outStorage',
    component: outStorage,
    meta: {
      title: 'outStorage'
    }
  },
  {
    path: '/dict',
    component: dict,
    meta: {
      title: 'dict'
    }
  },
  {
    path: '/report',
    component: report,
    meta: {
      title: 'report'
    }
  }
];

export default routes;
