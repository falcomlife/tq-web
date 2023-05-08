<template>
<el-row>
  <el-col :span="1">
    <div style="width:100%;height:1px;"></div>
  </el-col>
  <el-col :span="23">
    <el-table :data="tableInStorageOrderData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <expandRow2 :inStorage=scope.row :expandType=scope.row.expandType></expandRow2>
        </template>
      </el-table-column>
      <el-table-column label="品名" prop="name"></el-table-column>
      <el-table-column label="来料类别" prop="incomingType"></el-table-column>
      <el-table-column label="入库镀金颜色" prop="color"></el-table-column>
      <el-table-column label="烤厅" prop="bake"></el-table-column>
      <el-table-column label="图片" prop="image">
        <template slot-scope="scope">
          <div style="width:50%;height:50%;">
            <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="总个数" prop="bunchCount"></el-table-column>
      <el-table-column label="入库数量" prop="inCount"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
    </el-table>
  </el-col>
</el-row>
</template>

<script>
import axios from 'axios'
import expandRow2 from './expandRow2'

export default {
  name: 'expandRow',
  data() {
    return {
      tableInStorageOrderData: {},
    }
  },
  components: {
    expandRow2
  },
  props: {
    order: {},
  },
  created() {
    this.getInStorageListByOrder()
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
  }
}
</script>

<style>
</style>
