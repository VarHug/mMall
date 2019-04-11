import Vue from 'vue'
import Router from 'vue-router'
import Index from 'views/index.vue'
import Commodity from '../views/commodity/commodity.vue'
import Cart from '../views/cart/cart.vue'
import User from '../views/user/user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/commodity',
      component: Commodity
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/user',
      component: User
    }
  ]
})
