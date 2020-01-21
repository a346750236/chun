import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/styles/index.less'
// 引入axios
import axios from './utils/request' // 定义一个全局地址
Vue.prototype.$axios = axios // 赋值给全局对象
Vue.use(ElementUI) //  引入样式
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
