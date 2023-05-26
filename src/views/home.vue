<template>
  <div class="systemName">仓储管理系统</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  created() {
    this.$api.login.tokenVail().then(res => {
      if(res.data.s != 0){
        this.$route.replace('/login')
      }
    })
  },
  computed: {},
  methods: {}
}
</script>

<style>
.systemName{
  padding: 20% 35%;
  font-size: 50px;
  color: #909399;
  font-weight: bold;
}
</style>
