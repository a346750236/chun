<template>
  <!-- 头部组件 -->
  <el-row class="layout-header" type="flex" justify="space-betwwen" align="middle">
    <!-- 左侧 -->
    <el-col class="left" :span="6">
      <!-- 左侧图标 -->
      <i class="el-icon-s-fold"></i>
      <span class="title">那些你很冒险的梦，我陪你去疯</span>
    </el-col>
    <!-- 右侧 -->
    <el-col class="right" :span="4">
      <el-row type="flex" justify="end" align="middle">
        <img :src="userInfo.photo ?  userInfo.photo : defauitImg" alt />
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            下拉菜单
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
export default {
  name: 'LayoutHeader',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {}, // 用户信息
      defauitImg: require('../../assets/img/02.jpg')
    }
  },
  computed: {},
  watch: {},
  created () {
    //   获取用户信息
    this.getUserInfo()
  },
  mounted () {},
  methods: {
    //   获取用户信息
    async getUserInfo () {
      const result = await this.$axios({
        url: '/user/profile'
      })
      result.data = this.userInfo
    },
    //   下拉菜单事件
    handleCommand (command) {
      if (command === 'lgout') {
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')
      } else if (command === 'git') {
        window.location.href = 'https://github.com/a346750236/toutiao.git'
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
