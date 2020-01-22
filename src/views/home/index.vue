<template>
  <div class="Home-index">
    <!-- 先定义一个大容器 -->
    <el-container>
      <!-- 先放置一个左侧 -->
      <el-aside style="background-color:#353b4e;mix-height:100vh;width:230px">
        <!-- 左侧导航 -->
         <layout-aside></layout-aside>
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
export default {
  name: 'Home',
  components: {
  },
  props: {},
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">

</style>
