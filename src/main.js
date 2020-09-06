import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import routes from './router/index'
Vue.config.productionTip = false

Vue.use(VueRouter)

new Vue({
  store,
  router: new VueRouter(routes),
  render: function (h) { return h(App) }
}).$mount('#app')