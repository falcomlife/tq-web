<template>
<el-card class="box-card" shadow="hover">
  <el-form :model="loginForm" status-icon ref="loginForm" label-width="10%" class="demo-loginForm">
    <el-form-item label="账号" prop="pass">
      <el-input v-model="loginForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="checkPass">
      <el-input type="password" v-model="loginForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item style="">
      <el-button style="" type="primary" @click="submitForm()">登录</el-button>
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
      loginForm: {
        username: '',
        password: ''
      },
    }
  },
  created() {},
  computed: {},
  methods: {
    submitForm() {
      console.log(this.loginForm)
      this.$store.commit("changeLogin", true)
      localStorage.setItem("isLogin", true)
      localStorage.getItem("isLogin")
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 30%;
  padding: 2% 1%;
  margin-top: 15%;
  margin-left: 35%;
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}
</style>
