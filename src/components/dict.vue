<template>
<div>
  <el-row class="row">
    <el-col :span="12">
      <el-card class="box-card">
        <el-row class="row">
          <span class="boxlable">客户名称</span>
        </el-row>
        <el-row class="row">
          <el-button type="primary" icon="el-icon-document-add" @click="drawercustomer=true" size=mini round>新增</el-button>
        </el-row>
        <el-table :data="tableCustomer" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <el-row class="row">
          <span class="boxlable">镀金颜色</span>
        </el-row>
        <el-row class="row">
          <el-button type="primary" icon="el-icon-document-add" @click="drawercolor=true" size=mini round>新增</el-button>
        </el-row>
        <el-table :data="tableColor" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="12">
      <el-card class="box-card">
        <el-row class="row">
          <span class="boxlable">烤厅</span>
        </el-row>
        <el-row class="row">
          <el-button type="primary" icon="el-icon-document-add" @click="drawerct=true" size=mini round>新增</el-button>
        </el-row>
        <el-table :data="tableCt" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <el-row class="row">
          <span class="boxlable">来料类别</span>
        </el-row>
        <el-row class="row">
          <el-button type="primary" icon="el-icon-document-add" @click="drawercomingtype=true" size=mini round>新增</el-button>
        </el-row>
        <el-table :data="tableComingtype" :height="autoheight">
          <el-table-column prop="itemName" label="内容名称" style="width:100%"> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-drawer :visible.sync="drawercustomer" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">客户名称</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formCustomer" :rules="rules" :model="formCustomer" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formCustomer.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('customer')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer :visible.sync="drawercolor" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">镀金颜色</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formColor" :rules="rules" :model="formColor" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formColor.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('color')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer :visible.sync="drawerct" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">烤厅</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formCt" :rules="rules" :model="formCt" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formCt.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ct')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
  <el-drawer :visible.sync="drawercomingtype" :with-header="false" size='50%'>
    <div style="padding: 4% 10%;">
      <div style="padding-bottom: 1%;">
        <span class="boxlable">来料类别</span>
      </div>
      <el-divider></el-divider>
      <el-form ref="formComingtype" :rules="rules" :model="formComingtype" size="small">
        <el-form-item label="内容" prop="itemName">
          <el-input v-model="formComingtype.itemName" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('incomingtype')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'dict',
  data() {
    var itemName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      tableCustomer: [],
      tableColor: [],
      tableCt: [],
      tableComingtype: [],
      formCustomer: {},
      formColor: {},
      formCt: {},
      formComingtype: {},
      drawercustomer: false,
      drawercolor: false,
      drawerct: false,
      drawercomingtype: false,
      rules: {
        itemName: [{
          validator: itemName,
          trigger: 'blur'
        }]
      },
    }
  },
  created() {
    this.getCustomerDictList()
    this.getColorDictList()
    this.getCtDictList()
    this.getComingtypeDictList()
    this.autoheight = window.innerHeight / 2 - 200
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getCustomerDictList() {
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "customer"
          }
        })
        .then(res => {
          this.tableCustomer = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getColorDictList() {
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "color"
          }
        })
        .then(res => {
          this.tableColor = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getCtDictList() {
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "ct"
          }
        })
        .then(res => {
          this.tableCt = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getComingtypeDictList() {
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "incomingtype"
          }
        })
        .then(res => {
          this.tableComingtype = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    submitForm(form) {
      let body = {}
      if (form == 'customer') {
        body = {
          'type': form,
          'typeName': '客户名称',
          'itemName': this.formCustomer.itemName
        }
      } else if (form == 'color') {
        body = {
          'type': form,
          'typeName': '镀金颜色',
          'itemName': this.formColor.itemName
        }
      } else if (form == 'ct') {
        body = {
          'type': form,
          'typeName': '烤厅',
          'itemName': this.formCt.itemName
        }
      } else if (form == 'incomingtype') {
        body = {
          'type': form,
          'typeName': '来料类别',
          'itemName': this.formComingtype.itemName
        }
      }
      axios
        .post(this.global.apiUrl + 'dict/item', body, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.data.s == "0") {
            this.$message({
              showClose: true,
              message: '创建成功',
              type: 'success'
            });
            this.getCustomerDictList()
            this.getColorDictList()
            this.getCtDictList()
            this.getComingtypeDictList()
            this.drawercustomer = false
            this.drawercolor = false
            this.drawerct = false
            this.drawercomingtype = false
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
.boxlable{
  font-size: 16px;
  color: #909399;
  font-weight: bold;
}
</style>
