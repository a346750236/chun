<template>
  <div class='layout-aside'>
     <div class='title'>
         <img :src="collaspse ? smallImg:bigImg" alt="">
     </div>
     <!-- 添加router让组件变成路由组件 -->
     <el-menu
      :collapse="collaspse"
      router
      style="width:231px"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#ffd04b">
      <!-- 首页 -->
       <el-menu-item index="/home">
           <!-- 图标 -->
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 内容管理 二级菜单 el-submenu => el-menu-item-->
      <el-submenu index="1">
          <!-- el-submenu 插槽 title =>  一级显示内容 -->
        <template slot="title">
          <i class="el-icon-document"></i>
          <span>内容管理</span>
        </template>
          <!-- 二级内容 -->
          <el-menu-item index="/home/publish">发布文章</el-menu-item>
          <el-menu-item index="/home/articles">内容列表</el-menu-item>
          <el-menu-item index="/home/comment">评论列表</el-menu-item>
          <el-menu-item index="/home/material">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
          <!-- title插槽时submenu 中显示的一级内容 -->
          <template slot='title'>
              <i class='el-icon-s-custom'></i>
              <span>粉丝管理</span>
          </template>
          <!-- 二级内容 -->
         <el-menu-item index="/home/picture">图文数据</el-menu-item>
         <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
         <el-menu-item index="/home/fanslife">粉丝画像</el-menu-item>
         <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/home/account">
        <i class="el-icon-s-tools"></i>
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
    </div>
</template>

<script>
export default {
  name: 'LayoutAside',
  components: {},
  props: ['collaspse'], // 接收传过来的值
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
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
.layout-aside{
  // width: 230px;
  overflow: hidden;
   .el-menu {
     border-right: none;
    }
  .title{
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img{
      height: 35px;
    }
  }
}

</style>
