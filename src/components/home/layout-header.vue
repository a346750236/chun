<template>
  <!-- 头部组件 -->
  <el-row class="layout-header" type="flex" justify="space-between" align="middle">
    <!-- 左侧 -->
    <el-col class="left" :span="6">
      <!-- 左侧图标 -->
      <i @click="collaspseOropen" :class="{'el-icon-s-unfold':collaspse,'el-icon-s-fold' :!collaspse}"></i>
      <span class="title">那些你很冒险的梦，我陪你去疯</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ?  userInfo.photo : defauitImg" alt />
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">Git信息</el-dropdown-item>
            <el-dropdown-item command="lgout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus.js'
export default {
  name: 'LayoutHeader',
  components: {},
  props: {},
  data () {
    return {
      collaspse: false, // 默认是不折叠的
      userInfo: {}, // 用户信息
      defauitImg: require('../../assets/img/02.jpg')
    }
  },
  computed: {},
  watch: {},
  created () {
    //   获取用户信息
    this.getUserInfo()
    eventBus.$on('updateUserInfoSuccess', () => {
      // 别人告诉你 它更新了数据 应该立刻处理
      this.getUserInfo()
    })
  },
  mounted () {},
  methods: {
    // 折叠或者展开
    collaspseOropen () {
      this.collaspse = !this.collaspse // 直接取反
      // 通知被人需要改变宽度了
      eventBus.$emit('changeCollapse')
    },
    //   获取用户信息
    async getUserInfo () {
      const result = await this.$axios({
        url: '/user/profile'
      })
      this.userInfo = result.data
      // console.log(result.data)
    },
    //   下拉菜单事件
    handleCommand (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/a346750236/toutiao.git'
      } else if (command === 'info') {
        this.$router.push('/home/account') // 跳转到用户信息
      }
    }
  }
}
</script>

<style scoped lang="less">
.layout-header {
  height: 68px;
  .left {
    font-size: 20px;
    .title {
      margin-left: 5px;
      color: #2c3e50;
      font-size: 16px;
    }
  }
  .right {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
      margin-right: 30px;
    }
    .el-icon-arrow-down {
      font-size: 16px;
    }
  }
}
</style>
