import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasSelectAddress: {},
    cartGoodNum: 0,
    loading: false
  },
  mutations: {
    reselectAddress(state, val) {
      state.hasSelectAddress = val;
    },
    showLoading(state) {
      state.loading = true
    },
    hideLoading(state) {
      state.loading = false
    }
  },
  actions: {},
  modules: {}
})