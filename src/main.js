// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Cube from 'cube-ui'
import store from './store'

import '@/common/stylus/index.styl'

Vue.config.productionTip = false
Vue.use(Cube)

Vue.filter('price', function (value) {
  return `￥${value}.00`
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
