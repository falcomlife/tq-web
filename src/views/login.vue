<template>
<el-card class="box-card" shadow="hover" v-if="this.loginRegister">
  <h2>登录</h2>
  <el-form :model="loginForm" status-icon ref="loginForm" label-width="20%" class="demo-loginForm">
    <el-form-item label="公司编码" prop="companyCode">
      <el-input v-model="loginForm.companyCode" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="账号" prop="account">
      <el-input v-model="loginForm.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="loginRegister = false">注册</el-button>
      <el-button type="primary" @click="login()">登录</el-button>
    </el-form-item>
  </el-form>
</el-card>

<el-card class="box-card" shadow="hover" v-else>
  <h2>注册</h2>
  <el-form :model="registerForm" :rules="rules" status-icon ref="registerForm" label-width="20%" class="demo-registerForm">
    <el-form-item required label="公司编码" prop="companyCode">
      <el-input v-model="registerForm.companyCode" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item required label="账号" prop="account">
      <el-input v-model="registerForm.account" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item required label="密码" prop="password1">
      <el-input type="password" v-model="registerForm.password1" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item required label="确认密码" prop="password2">
      <el-input type="password" v-model="registerForm.password2" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="loginRegister = true">返回登录</el-button>
      <el-button type="primary" @click="submitForm()">提交</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    var companyCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var account = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var password1 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var password2 = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      loginRegister: true,
      loginForm: {
        companyCode: '',
        account: '',
        password: ''
      },
      registerForm: {
        companyCode: '',
        account: '',
        password1: '',
        password2: '',
        password: ''
      },
      rules: {
        companyCode: [{
          validator: companyCode,
          trigger: 'blur'
        }],
        account: [{
          validator: account,
          trigger: 'blur'
        }],
        password1: [{
          validator: password1,
          trigger: 'blur'
        }],
        password2: [{
          validator: password2,
          trigger: 'blur'
        }],
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let body = {
            username: this.loginForm.companyCode + "/" + this.loginForm.account,
            password: this.loginForm.password
          }
          this.$api.login.login(body).then(res => {
            if(res.data.status == 200){
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'success'
              })
              this.$store.commit("changeLogin", true)
              localStorage.setItem("token", res.data.token)
              this.$router.push("/")
            }else{
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: 'error'
              })
            }
          })
        }
      })
    },
    submitForm() {
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          if(this.registerForm.password1 != this.registerForm.password2){
            this.$message({
              showClose: true,
              message: '两次输入的密码不一致',
              type: 'error'
            })
            return
          }
          let body = {
            companyCode: this.registerForm.companyCode,
            account: this.registerForm.account,
            password: this.registerForm.password1
          }
          this.$api.login.register(body).then(res => {
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            });
            this.loginRegister = true
          })
        }
      })
    },
  }
}
</script>

<style scoped>
.box-card {
  width: 30%;
  padding: 2% 1%;
  margin-top: 10%;
  margin-left: 33%;
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}
</style>
