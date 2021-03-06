// 权限拦截 导航守卫
import router from '../router/index.js'
import progress from 'nprogress'
import 'nprogress/nprogress.css'

// 路由守卫设置
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  progress.start() // 开启进度条
  // 判断 拦截的范围
  if (to.path.startsWith('/home')) {
    // 进入到了拦截范围
    // 判断是否登录 有token 就登录 没token就没登录
    let token = window.localStorage.getItem('user-token') // 获取token
    if (token) {
      // 如果有token
      next()
    } else {
      next('/login') // 没有token 就跳转到登录页
    }
  } else {
    next() // 放行
  }
})
// afterEach
router.afterEach(function () {
  progress.done() // 关闭进度条
})
