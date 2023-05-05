<template>
<div id="app">
  <el-container direction="vertical">
    <el-header class="title">同庆工艺品有限公司</el-header>
    <el-container direction="horizontal">
      <el-aside width=10%>
        <el-row>
          <el-col>
            <el-menu default-active="/order" router>
              <el-menu-item index="/order">
                <span>订单管理</span>
              </el-menu-item>
            </el-menu>
            <el-menu default-active="/inStorage" router>
              <el-menu-item index="/inStorage">
                <span>入库管理</span>
              </el-menu-item>
            </el-menu>
            <el-menu default-active="/outStorage" router>
              <el-menu-item index="/outStorage">
                <span>出库管理</span>
              </el-menu-item>
            </el-menu>
            <el-menu default-active="/report" router>
              <el-menu-item index="/report">
                <span>报表统计</span>
              </el-menu-item>
            </el-menu>
            <el-menu default-active="/dict" router>
              <el-menu-item index="/dict">
                <span>字典管理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
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
      activeIndex: '/'
    }
  }
}
</script>

<style>

.nav {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial,sans-serif;
}

.content {
  float: left;
  width: 92%;
}

.title {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font: bold 40px/60px arial,sans-serif;
  color: #fff;
  background-color: #99CCFF;
}
body{
  margin: 0px;
}
</style>
