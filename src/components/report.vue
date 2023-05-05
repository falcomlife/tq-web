<template>
<div>
  <el-row class="row">
    <el-col :span="12">
      <el-card class="box-card">
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
            <el-table :data="orderByColor" style="width: 100%" :default-sort="{prop: 'count', order: 'descending'}">
              <el-table-column prop="color" label="镀金颜色" sortable width="180">
              </el-table-column>
              <el-table-column prop="count" label="总量" sortable width="80">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
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
import axios from 'axios'

export default {
  name: 'report',
  data() {
    return {
      ordermonth: '',
      inStoragemonth: '',
      orderStatistics: 0,
      inStorageStatistics: 0,
      orderByColor: [],
      reInStorageCount: 0,
      reInStorageRatio: 0
    }
  },
  created() {
    // this.getOrderStatistics()
    // this.getInStorageStatistics()
    this.autoheight = window.innerHeight / 2 - 200
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getOrderStatistics() {
      if (this.ordermonth == null) {
        this.orderStatistics = 0
        return
      }
      axios
        .get(this.global.apiUrl + 'order/statistics', {
          params: {
            time: this.ordermonth,
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.orderStatistics = res.data.rs
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getOrderStatisticsColor() {
      if (this.ordermonth == null) {
        this.orderByColor = []
        return
      }
      axios
        .get(this.global.apiUrl + 'order/statistics/color', {
          params: {
            time: this.ordermonth,
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.orderByColor = res.data.rs
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getInStorageStatistics() {
      if (this.inStoragemonth == null) {
        this.inStorageStatistics = 0
        return
      }
      axios
        .get(this.global.apiUrl + 'inStorage/statistics', {
          params: {
            time: this.inStoragemonth,
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.inStorageStatistics = res.data.rs
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getInStorageStatisticsRatio() {
      if (this.inStoragemonth == null) {
        this.inStorageStatistics = 0
        return
      }
      axios
        .get(this.global.apiUrl + 'inStorage/statistics/reratio', {
          params: {
            time: this.inStoragemonth,
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.reInStorageRatio = res.data.rs.ratio
            this.reInStorageCount = res.data.rs.recount
          } else {
            this.$message({
              showClose: true,
              message: res.data.rs,
              type: 'error'
            });
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    orderChange(e) {
      console.log(e)
      this.getOrderStatistics()
      this.getOrderStatisticsColor()
    },
    inStorageChange(e) {
      console.log(e)
      this.getInStorageStatistics()
      this.getInStorageStatisticsRatio()
    },
  }
}
</script>

<style>
.el-table .cell {
  white-space: pre-line;
}

.row {
  margin-bottom: 10px;
}

.input {
  width: 100%;
}

.td1 {
  width: 20%;
}

.td2 {
  width: 80%;
}

.box-card {
  width: 98%;
}

.boxlable {
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}

.numlable {
  padding: 20% 20%;
  font-size: 20px;
  color: #909399;
  font-weight: bold;
}

.selectlable {
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}

.selectrow {
  vertical-align: middle;
  line-height: 40px;
}
</style>
