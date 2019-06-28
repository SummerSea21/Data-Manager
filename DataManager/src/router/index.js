import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
import User from '@/components/users/users'
import Roles from '@/components/permission/roles'
import Rights from '@/components/permission/rights'
import goods from '../components/products/goods.vue'
import params from '../components/products/params.vue'
import categories from '../components/products/categories.vue'
import goodsadd from '../components/products/goodsadd.vue'
import orders from '../components/products/orders.vue'
Vue.use(Router)
let router = new Router({
  routes: [{
      path: '/', 
      redirect:'/home'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [{
          path: '/users',
          component: User
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/goods',
          component: goods,
        },
        {
          path: '/params',
          component: params
        },
        {
          path: '/categories',
          component: categories
        },
        {
          path:'/add',
          component:goodsadd
        },
        {
          path:'/orders',
          component:orders
        }
      ]
    }
  ]
})
router.beforeEach(function (to, from, next) {
  if (to.name !== 'login') {
    let token = window.localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()

  }
})
export default router
