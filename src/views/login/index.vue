<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <!-- 在 Form 组件中，每一个表单域由一个 Form-Item 组件构成，表单域中可以放置各种类型的表单控件，
      包括 Input、Select、Checkbox、Radio、Switch、DatePicker、TimePicker-->
      <el-form ref="Myform" :model="loginForm" :rules="loginRules">
        <!-- 里面要写el-from-item -->
        <!-- 每一个表单域由一个 Form-Item 组件构成 -->
        <el-form-item prop="mobile">
          <!-- 手机号 -->
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号" style="margin-top:10px;"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 验证码 -->
          <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:70%"></el-input>
          <!-- 发送验证码 -->
          <el-button style="float:right" type="primary" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <!-- 同意选项 -->
          <el-checkbox v-model="loginForm.check"  style="font-size:20px">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button type="primary" @click.prevent="submitLogin" style="width:100%">登录</el-button>
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
    let validator = function (rule, value, callBack) {
      // rule当前规则
      // value当前表单项的值
      // callback 回调函数
      // 正常写法
    //   if (value) {
    //     // 正确 勾选了协议
    //     callBack() // 一切OK请继续
    //   } else {
    //     // 不对 没勾选协议
    //     callBack(new Error('您必须同意无条件被我们蒙骗'))
    //   }
      value ? callBack() : callBack(new Error('您必须同意无条件被我们蒙骗')) // 三元表达模式
    }
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        check: false //  是否同意协议
      },
      loginRules: {
        //   决定着校验规则  key(字段名):value(对象数组) => 一个对象就是一个校验规则
        // required 为true 就表示该字段必填 如果不填 就会提示消息
        mobile: [{
          required: true, message: '请输入您的手机号'
        }, {
          pattern: /^1[3456789]\d{9}$/, message: '请输入合法手机号'
        }],
        code: [{
          required: true, message: '请输入验证码'
        },
        {
          pattern: /^\d{6}$/, message: '验证码为6位数字'
        }],
        check: [{ validator }]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    submitLogin () {
      // 校验整个表单的规则
      // validate 是一个方法 => 方法中传入的一个函数 两个校验参数  是否校验成功/未校验成功的字段
      this.$refs.Myform.validate(isok => {
        if (isok) {
          // console.log('校验成功')
          this.$axios({
            url: 'authorizations',
            method: 'POST',
            data: this.loginForm
          }).then(result => {
            // 前端注入令牌
            window.localStorage.setItem('user-token', result.data.token)
            // 成功进入主页
            this.$router.push('/home')
          })
        }
      })
    }
  }
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
