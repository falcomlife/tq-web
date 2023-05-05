import order from './components/order.vue';
import inStorage from './components/inStorage.vue';
import outStorage from './components/outStorage.vue';
import dict from './components/dict.vue';
import report from './components/report.vue';
import Index from './components/Index.vue';

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: 'Index'
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
