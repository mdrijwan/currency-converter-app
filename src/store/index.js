import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
  },
  getters: {
    getHistory(state) {
      return state.history
    }
  },
  mutations: {
    addToHistory(state, payload) {
      if(state.history.length < 5) {
        state.history.push(payload)
      }
      else {
        state.history.shift()
        state.history.push(payload)
      }
    },
  },
  actions: {
  },
  modules: {
  }
})