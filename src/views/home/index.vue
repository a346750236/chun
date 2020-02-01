<template>
  <div class="Home-index">
    <!-- 先定义一个大容器 -->
    <el-container>
      <!-- 先放置一个左侧 -->
      <el-aside :style="{ width: collaspse ? '60px' : '230px'}" style="transition:all 0.3s;background-color:#353b4e;min-height:100vh;">
        <!-- 左侧导航 -->
         <layout-aside :collaspse="collaspse"></layout-aside>
      </el-aside>
      <!-- 右侧大容器 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 头部导航 -->
          <layout-header></layout-header>
        </el-header>
        <!-- 中间区域 -->
        <el-main style="padding:0">
          <!-- 二级路由容器 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
export default {
  name: 'Home',
  components: {
  },
  props: {},
  data () {
    return {
      collaspse: false // 是否折叠
    }
  },
  computed: {},
  watch: {},
  created () {
    // 开启监听
    eventBus.$on('changeCollapse', () => {
      // alert('1')
      this.collaspse = !this.collaspse // 直接取反
    })
  },
  mounted () {},
  methods: {

  }
}
</script>

<style scoped lang="less">

</style>
