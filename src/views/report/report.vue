<template>
<div>
  <el-row class="row">
    <el-col :span="12">
      <el-card class="box-card" :style="{height: scrollerHeight}">
        <el-row class="row">
          <i class="el-icon-s-data selectlable"></i>
          <span class="boxlable">订单统计</span>
        </el-row>
        <el-row class="row selectrow">
          <el-col :span="2">
            <span class="selectlable">月份：</span>
          </el-col>
          <el-col :span="4">
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="ordermonth" @change="orderChange" type="month" align="right" unlink-panels range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-divider> </el-divider>
        <el-row class="row selectrow">
          <el-col :span="12">
            <span class="numlable">总计</span>
          </el-col>
          <el-col :span="12">
            <span class="numlable">镀金颜色分类统计</span>
          </el-col>
        </el-row>
        <el-row class="row selectrow">
          <el-col :span="12">
            <span class="numlable">{{this.orderStatistics}}</span>
          </el-col>
          <el-col :span="12">
            <div style="overflow-y: scroll;" :style="{height: scrollerHeightDiv}">
              <el-table :data="orderByColor" style="width: 100%" :default-sort="{prop: 'count', order: 'descending'}">
                <el-table-column prop="color" label="镀金颜色" sortable width="180">
                </el-table-column>
                <el-table-column prop="count" label="总额（元）" sortable width="80">
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card" :style="{height: scrollerHeight}">
        <el-row class="row">
          <i class="el-icon-s-data selectlable"></i>
          <span class="boxlable">入库统计</span>
        </el-row>
        <el-row class="row selectrow">
          <el-col :span="2">
            <span class="selectlable selectrow">月份：</span>
          </el-col>
          <el-col :span="4">
            <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="inStoragemonth" @change="inStorageChange" type="month" align="right" unlink-panels range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
          </el-col>
        </el-row>
        <el-divider> </el-divider>
        <el-row class="row selectrow">
          <el-col :span="12">
            <span class="numlable">总计</span>
          </el-col>
          <el-col :span="12">
            <span class="numlable">返修统计</span>
          </el-col>
        </el-row>
        <el-row class="row selectrow">
          <el-col :span="12">
            <span class="numlable">{{this.inStorageStatistics}}</span>
          </el-col>
          <el-col :span="12">
            <el-row class="row">
              <el-col :span="18">
                <span class="boxlable">返镀件个数</span>
              </el-col>
              <el-col :span="6">
                <span class="boxlable">{{this.reInStorageCount}}</span>
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="18">
                <span class="boxlable">返修率</span>
              </el-col>
              <el-col :span="6">
                <span class="boxlable">{{this.reInStorageRatio}}%</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
import report from "./report.js"
export default report
</script>

<style>
@import 'report.css'
</style>
