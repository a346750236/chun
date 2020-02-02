import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Home from '@/views/home/index.vue'
import Home1 from '@/views/home/home.vue'

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
    path: '*', // 全局匹配未找到页面
    component: () => import('@/views/404.vue') // 按需加载
  },
  {
    // 主页
    path: '/home',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        component: Home1
      },
      {
        // 评论列表
        path: 'comment',
        component: () => import('@/views/comment') // 按需加载
      },
      {
        path: 'material',
        component: () => import('@/views/material') // 按需加载
      }, {
        path: 'articles',
        component: () => import('@/views/articles') // 按需加载
      }, {
        path: 'publish/:arId', // 定义动态路由参数  此规则只匹配修改文章
        component: () => import('@/views/publish') // 按需加载
      }, {
        path: 'publish', //  此规则匹配发布文章
        component: () => import('@/views/publish') // 按需加载
      },
      {
        path: 'account', // 账户信息
        component: () => import('@/views/account') // 按需加载
      }

    ]
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
