<template>
<el-row>
  <el-col :span="1">
    <div style="width:100%;height:1px;"></div>
  </el-col>
  <el-col :span="23">
    <el-table :data="tableOutStoragesData" style="width: 100%" v-if="expandType=='outStoragesByInStorage'">
      <el-table-column label="总个数" prop="bunchCount"></el-table-column>
      <el-table-column label="出库数量" prop="outCount"></el-table-column>
      <el-table-column prop="outType" label="出库类型"> </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>

    <el-table :data="tableOutStorageData" style="width: 100%" v-else-if="expandType=='outStorageByInStorage'">
      <el-table-column label="总个数" prop="bunchCount"></el-table-column>
      <el-table-column label="出库数量" prop="outCount"></el-table-column>
      <el-table-column prop="outType" label="出库类型"> </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>
  </el-col>
</el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'expandRow2',
  data() {
    return {
      tableOutStoragesData: {},
      tableOutStorageData: {},
    }
  },
  props: {
    order: {},
    inStorage: {},
    expandType: {}
  },
  created() {
    console.log("this.inStorage", this.inStorage)
    console.log("expandType", this.expandType)
    if (this.expandType == "outStoragesByInStorage") {
      this.getOutStorageListByInStorage()
    } else if (this.expandType == "outStorageByInStorage") {
      this.getOutStorageByInStorage()
    }
  },
  computed: {

  },
  methods: {
    getOutStorageListByInStorage() {
      console.log("getOutStorageListByInStorage")
      axios
        .get(this.global.apiUrl + 'outStorage/list', {
          params: {
            inStorageId: this.inStorage.id
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            console.log("res", res)
            this.tableOutStoragesData = res.data.rs
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
    getOutStorageByInStorage() {
      axios
        .get(this.global.apiUrl + 'outStorage/one', {
          params: {
            outStorageId: this.inStorage.outStorageId
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            console.log("res", res)
            this.tableOutStorageData = res.data.rs
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
    }
  }
}
</script>

<style>
</style>
