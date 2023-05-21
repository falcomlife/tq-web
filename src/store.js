import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    netWorkBroke: false,
    isLogin: false
  },
  mutations: {
    changeNetwork(state,s){
      state.netWorkBroke = s
    },
    changeLogin(state,s){
      state.isLogin = s
    }
  },
  actions: {},
  modules: {},
})
