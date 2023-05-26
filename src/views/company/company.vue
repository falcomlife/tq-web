<template>
<div>
  <div v-if="this.$route.meta.level == 1">
    <el-row class="row selectrow">
      <el-col :span="2">
        <span class="selectlable">客户名称</span>
      </el-col>
      <el-col :span="4">
        <el-input style="width:82%;" v-model="nameSelect" placeholder="请输入客户名称" clearable></el-input>
      </el-col>
      <el-col :span="1">
        <span class="selectlable">编号</span>
      </el-col>
      <el-col :span="4">
        <el-input style="width:82%;" v-model="codeSelect" placeholder="请输入编号" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <span class="selectlable">时间范围</span>
      </el-col>
      <el-col :span="5">
        <div class="block">
          <el-date-picker style="width:80%;" v-model="time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-col>

      <el-col :span="6">
        <el-button-group>
          <el-tooltip class="item" effect="light" content="搜索信息" placement="bottom">
            <el-button type="primary" icon="el-icon-search" @click="getList()" size=small round>搜索</el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="bottom">
            <el-button type="primary" icon="el-icon-document-remove" @click="remove()" size=small round>删除</el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
          <el-table-column type="selection" width=100>
          </el-table-column>
          <el-table-column prop="name" label="客户名称" width=400> </el-table-column>
          <el-table-column prop="code" label="编号" width=400> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width=400> </el-table-column>
          <el-table-column label="操作" width=100>
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="详情" placement="bottom">
                <el-button type="primary" icon="el-icon-edit-outline" size="mini" circle @click="toinfo(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[20, 50, 100, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRowCount">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
  <router-view v-if="this.$route.meta.level == 2" :key="Math.random()"></router-view>
</div>
</template>

<script>
import company from "./company.js"
export default company
</script>

<style>
@import 'company.css'
</style>
