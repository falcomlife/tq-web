import order from './views/order/order.vue';
import inStorage from './views/inStorage/inStorage.vue';
import outStorage from './views/outStorage/outStorage.vue';
import dict from './views/dict/dict.vue';
import report from './views/report/report.vue';
import home from './views/home.vue';
import login from './views/login.vue';

const routes = [
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
    component: home,
    meta: {
      title: 'home',
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
    path: '/dict',
    component: dict,
    meta: {
      title: 'dict',
      keepAlive: true
    }
  },
  {
    path: '/report',
    component: report,
    meta: {
      title: 'report',
      keepAlive: true
    }
  }
];

export default routes;
