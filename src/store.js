import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    netWorkBroke: false
  },
  mutations: {
    changeNetwork(state,s){
      state.netWorkBroke = s
    }
  },
  actions: {},
  modules: {},
})
