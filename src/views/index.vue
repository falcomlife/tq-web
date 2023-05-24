<template>
  <div id="app">
    <el-alert
    title="网络异常"
    type="error"
    description="网络请求未能成功发出，请检查本地电脑网络情况，检查是否使用代理。"
    show-icon
    v-if="this.alertShow"
    @close="alertClose">
  </el-alert>
    <el-container direction="vertical">
      <el-header class="title">青岛同庆工艺品有限公司</el-header>
      <el-container direction="horizontal">
        <el-aside width=10% class="self-menu">
          <el-menu default-active="/order" router style="border-right: solid 0px #ffffff;">
            <el-menu-item index="/order">
              <span class="self-menu-item">订单管理</span>
            </el-menu-item>
          </el-menu>
          <el-menu default-active="/inStorage" router style="border-right: solid 0px #ffffff;">
            <el-menu-item index="/inStorage">
              <span>入库管理</span>
            </el-menu-item>
          </el-menu>
          <el-menu default-active="/outStorage" router style="border-right: solid 0px #ffffff;">
            <el-menu-item index="/outStorage">
              <span>出库管理</span>
            </el-menu-item>
          </el-menu>
          <el-menu default-active="/report" router style="border-right: solid 0px #ffffff;">
            <el-menu-item index="/report">
              <span>报表统计</span>
            </el-menu-item>
          </el-menu>
          <el-menu default-active="/dict" router style="border-right: solid 0px #ffffff;">
            <el-menu-item index="/dict">
              <span>字典管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Index',
  data() {
    return {
      autoheight: 0
    }
  },
  created() {},
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 100) + 'px'; //自定义高度需求
    },
    alertShow: function(){
      return this.$store.state.netWorkBroke
    }
  },
  methods: {
    alertClose(){
      this.$store.commit('changeNetwork', false)
    }
  }
}
</script>

<style scoped>
.nav {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial, sans-serif;
}

.content {
  float: left;
  width: 92%;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial, sans-serif;
  color: #fff;
  background-color: #409EFF;
}

.self-menu-item {
  border-right: solid 0px #ffffff;
}

.self-menu {
  border-right: solid 1px #e6e6e6;
}
</style>
