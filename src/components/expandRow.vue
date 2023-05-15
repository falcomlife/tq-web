<template>
<el-row>
  <el-col :span="1">
    <div style="width:100%;height:1px;"></div>
  </el-col>
  <el-col :span="23">

    <el-table :data="tableInStorageOrderData" style="width: 100%" v-if="expandType=='inStorageByOrder'" row-class-name="expandtablebody" header-row-class-name="expandtableheader">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <expandRow :inStorage="scope.row" :expandType="scope.row.expandType"></expandRow>
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="品名" prop="name"></el-table-column>
      <el-table-column label="来料类别" prop="incomingType"></el-table-column>
      <el-table-column label="入库镀金颜色" prop="color"></el-table-column>
      <el-table-column label="烤厅" prop="bake"></el-table-column>
      <el-table-column label="图片" prop="image">
        <template slot-scope="scope">
          <div style="width:20%;height:20%;">
            <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总个数" prop="bunchCount"></el-table-column>
      <el-table-column label="入库数量" prop="inCount"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>

    <el-table :data="tableOutStoragesData" style="width: 100%" v-if="expandType=='outStoragesByInStorage'" row-class-name="expandtablebody" header-row-class-name="expandtableheader">
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="出库类型" prop="outType" > </el-table-column>
      <el-table-column label="总个数" prop="bunchCount"></el-table-column>
      <el-table-column label="出库数量" prop="outCount"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>

    <el-table :data="tableOutStorageData" style="width: 100%" v-else-if="expandType=='outStorageByInStorage'" row-class-name="expandtablebody" header-row-class-name="expandtableheader">
      <el-table-column label="编号" prop="code"></el-table-column>
      <el-table-column label="出库类型" prop="outType" > </el-table-column>
      <el-table-column label="总个数" prop="bunchCount"></el-table-column>
      <el-table-column label="出库数量" prop="outCount"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>

  </el-col>
</el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'expandRow',
  data() {
    return {
      tableInStorageOrderData: {},
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
    if(this.expandType == "inStorageByOrder"){
      this.getInStorageListByOrder()
    } else if (this.expandType == "outStoragesByInStorage") {
      this.getOutStorageListByInStorage()
    } else if (this.expandType == "outStorageByInStorage") {
      this.getOutStorageByInStorage()
    }
  },
  computed: {

  },
  methods: {
    getInStorageListByOrder() {
      axios
        .get(this.global.apiUrl + 'inStorage/order', {
          params: {
            orderId: this.order.id
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            console.log(res.data)
            this.tableInStorageOrderData = res.data.rs
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
.expandtableheader th {
  padding: 2px 2px !important;
  background-color: #f9f9f9 !important;
}
.expandtablebody td {
  padding: 2px 2px !important;
  background-color: #f9f9f9;

}
</style>
