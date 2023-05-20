<template>
  <el-card class="box-card" shadow="hover">
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-input placeholder="请输入密码" v-model="input" show-password></el-input>
    <el-button type="primary" disabled>主要按钮</el-button>
  </el-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {}
  },
  created() {},
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 100) + 'px'; //自定义高度需求
    }
  },
}
</script>

<style scoped>

</style>
