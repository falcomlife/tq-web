<template>
<div id="app">
  <el-container direction="vertical">
    <el-header class="title">青岛同庆工艺品有限公司</el-header>
    <el-container direction="horizontal" >
      <el-aside width=10% class="self-menu">
        <el-menu default-active="/" router style="border-right: solid 0px #ffffff;">
          <el-menu-item index="/">
            <span class="self-menu-item">首页</span>
          </el-menu-item>
        </el-menu>
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
export default {
  name: 'App',
  data() {
    return {
      activeIndex: '/',
      autoheight: 0
    }
  },
  created(){}
}
</script>

<style>
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

body {
  margin: 0px;
}
</style>
