<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，
      包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker-->
      <el-form>
        <!-- 里面要写el-from-item -->
        <!-- 每一个表单域由一个 Form-Item 组件构成 -->
        <el-form-item>
          <!-- 手机号 -->
          <el-input placeholder="请输入手机号" style="margin-top:10px;"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- 验证码 -->
          <el-input placeholder="请输入验证码" style="width:70%"></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right" type="primary" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <!-- 同意选项 -->
          <el-checkbox style="font-size:20px">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
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
.login {
  background-image: url("../../assets/img/LBJ.jpg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 430px;
    height: 330px;
    .title {
      text-align: center;
      img {
        height: 40px;
        width: 60%;
      }
    }
  }
}
</style>
