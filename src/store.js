import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    netWorkBroke: false,
    isLogin: false,
    authorities: [],
  },
  mutations: {
    changeNetwork(state,s){
      state.netWorkBroke = s
    },
    changeLogin(state,s){
      state.isLogin = s
    },
    authorities(state,s){
      state.authorities = s
    },
  },
  actions: {},
  modules: {},
})
