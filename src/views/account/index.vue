<template>
  <el-card>
    <my-bread slot="header">
      <template slot="title">账户信息</template>
    </my-bread>
    <!-- 放置上传组件 -->
      <el-upload class='head-upload' action="ql" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
    <!-- 放置Form组件 -->
    <el-form style="margin-left:60px" label-width="100px">
      <el-form-item label="用户名">
         <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="简介">
         <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
         <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
         <el-input v-model="formData.mobile" style="width:30%" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {},
  data () {
    return {
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      defaultImg: require('../../assets/img/admire.png')
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfo()
  },
  mounted () {},
  methods: {
    // 获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    }
  }
}
</script>

<style scoped lang="less">
.head-upload{
  position: absolute;
  right: 200px;
  img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
}
</style>
