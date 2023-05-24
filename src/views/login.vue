<template>
<el-card class="box-card" shadow="hover" >
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
      <el-button type="primary" @click="submitForm()">登录</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {
      login: true,
      loginForm: {
        companyCode: '',
        account: '',
        password: ''
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    submitForm() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          let body = {
            username: this.loginForm.companyCode+"/"+this.loginForm.account,
            password: this.loginForm.password
          }
          this.$api.login.login(body).then(res => {
            console.log(res)
            this.$store.commit("changeLogin", true)
            localStorage.setItem("token",res.data.token)
            this.$router.push("/")
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
  margin-left: 35%;
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}
</style>
