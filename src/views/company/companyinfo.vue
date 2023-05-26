<template>
<div>
  <el-tabs :style="{height: autoheight}">
    <el-tab-pane label="用户管理">
      <user :companyId="companyId"></user>
    </el-tab-pane>
    <el-tab-pane label="角色管理">
      <role :companyId="companyId"></role>
    </el-tab-pane>
  </el-tabs>
</div>
</template>
<script>
import user from "./user/user"
import role from "./role/role"

export default {
  name: 'companyinfo',
  data() {
    return {
      flag: "user",
      companyId: "",
    }
  },
  components: {
    user,
    role,
  },
  created() {
    this.companyId = this.$route.query.id
  },
  computed: {
    autoheight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    }
  },
}
</script>

<style>
</style>
