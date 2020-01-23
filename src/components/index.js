import LayoutAside from './home/layout-aside.vue'
import LayoutHeader from './home/layout-header.vue'
import Mybread from '@/components/Mybread/my-bread'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('my-bread', Mybread) // 全局注册
  }
}
