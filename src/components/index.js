import LayoutAside from './home/layout-aside.vue' // 左侧导航
import LayoutHeader from './home/layout-header.vue' // 头部导航
import Mybread from '@/components/Mybread/my-bread' // 面包屑
import CoverImage from './publish/C-image'
import { quillEditor } from 'vue-quill-editor' // 引入了quill组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('C-image', CoverImage) // 全局注册
    Vue.component('my-bread', Mybread) // 全局注册
    Vue.component('quill-editor', quillEditor) // 全局注册富文本
  }
}
