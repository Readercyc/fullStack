import Vue from 'vue'
import VueRouter from './kvue-router' //自己的Vue-router
import Home from '../views/Home.vue'

// VUE插件 是fn或者object.install
// 当执行Vue.use引入插件时，会调用install,并传入一个Vue实例对象。
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
