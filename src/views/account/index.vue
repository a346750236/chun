<template>
  <el-card>
    <my-bread slot="header">
      <template slot="title">账户信息</template>
    </my-bread>
    <!-- 放置上传组件 -->
      <el-upload  v-loading="loading" :http-request="uploadImg" class='head-upload' action="ql" :show-file-list="false">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
    <!-- 放置Form组件 -->
    <el-form :model="formData" :rules="rules" ref="Myform" style="margin-left:60px" label-width="100px">
      <el-form-item prop="name" label="用户名">
         <el-input v-model="formData.name" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item prop="intrp" label="简介">
         <el-input v-model="formData.intro" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
         <el-input v-model="formData.email" style="width:30%"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机号">
         <el-input v-model="formData.mobile" style="width:30%" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入文件
import eventBus from '@/utils/eventBus.js'
export default {
  name: 'PostComment',
  components: {},
  props: {},
  data () {
    return {
      loading: false, // 等待默认关闭
      // 定义一个表单数据对象
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: '' // 手机号
      },
      defaultImg: require('../../assets/img/admire.png'),
      rules: {
        name: [{
          required: true, message: '用户名不能为空' }, { mix: 1, max: 7, message: '用户名的长度限制为1到7字符' }],
        email: [{
          required: true, message: '邮箱不能为空'
        }, {
          pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
          message: '邮箱格式不正确'
        }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getUserInfo()
  },
  mounted () {},
  methods: {
    // 上传图片
    // 默认有个参数
    async uploadImg (params) {
      this.loading = true // 打开等待
      let data = new FormData()
      data.append('photo', params.file)
      const result = await this.$axios({
        url: '/user/photo',
        method: 'PATCH',
        data
      })
      this.loading = false // 关闭等待
      this.formData.photo = result.data.photo
      eventBus.$emit('updateUserInfoSuccess') // 触发一个自定义事件
    },
    // 用户效验
    async saveUserInfo () {
      await this.$refs.Myform.validate(async isok => {
        if (isok) {
          await this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          })
          this.$message({
            type: 'success',
            message: '保存信息成功'
          })
          eventBus.$emit('updateUserInfoSuccess') // 触发一个自定义事件
        }
      })
    },
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
