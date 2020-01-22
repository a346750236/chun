import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '@/views/home/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转到指定页面
    path: '/',
    redirect: '/home'
  },
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
