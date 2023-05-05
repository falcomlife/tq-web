<template>
<div>
  <el-row class="row">
    <el-col :span="24">
      <!-- 新建 -->
      <el-drawer :visible.sync="draweradd" :with-header="false" size='50%'>
        <div style="padding: 4% 10%;">
          <el-tabs>
            <el-tab-pane label="新增订单" style="margin-top:4%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formout" :rules="rules" :model="formout" size="small">
                <el-form-item label="客户名称" prop="customerName">
                  <el-select v-model="formout.customerName" filterable placeholder="请选择">
                    <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="产品图片" prop="image">
                  <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                    <img v-if="formout.image" :src="formout.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="PO#" prop="poNum">
                  <el-input v-model="formout.poNum"></el-input>
                </el-form-item>
                <el-form-item label="ITEM" prop="item">
                  <el-input v-model="formout.item"></el-input>
                </el-form-item>
                <el-form-item label="镀金颜色" prop="color">
                  <el-select v-model="formout.color" filterable placeholder="请选择">
                    <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :required=true label="数量" prop="count">
                  <el-input v-model="formout.count"></el-input>
                </el-form-item>
                <el-form-item :required=true label="单价" prop="price">
                  <el-input type=number v-model="formout.price"></el-input>
                </el-form-item>
                <el-form-item label="合计" prop="sum">
                  <el-input type=number v-model="formout.sum"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm()">提交</el-button>
                  <el-button @click="resetForm('formout')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
      <!-- 详情 -->
      <el-drawer :visible.sync="drawerupdate" :with-header="false" size='50%'>
        <div style="padding: 4% 10%;">
          <el-tabs>
            <el-tab-pane label="编辑订单" style="margin-top:4%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                <el-form-item label="客户名称" prop="customerName">
                  <el-select v-model="formoutupdate.customerNameId" filterable placeholder="请选择">
                    <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="产品图片" prop="image">
                  <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload">
                    <img v-if="formoutupdate.image" :src="formoutupdate.image" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="PO#" prop="poNum">
                  <el-input v-model="formoutupdate.poNum"></el-input>
                </el-form-item>
                <el-form-item label="ITEM" prop="item">
                  <el-input v-model="formoutupdate.item"></el-input>
                </el-form-item>
                <el-form-item label="镀金颜色" prop="color">
                  <el-select v-model="formoutupdate.colorId" filterable placeholder="请选择">
                    <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :required=true label="数量" prop="count">
                  <el-input v-model="formoutupdate.count"></el-input>
                </el-form-item>
                <el-form-item :required=true label="单价" prop="price">
                  <el-input type=number v-model="formoutupdate.price"></el-input>
                </el-form-item>
                <el-form-item label="合计" prop="sum">
                  <el-input type=number v-model="formoutupdate.sum"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFormUpdate()">提交修改</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>

    </el-col>
  </el-row>
  <el-row class="row selectrow">
    <el-col :span="2">
      <span class="selectlable">客户名称：</span>
    </el-col>
    <el-col :span="5">
      <el-select v-model="customerNameSelect" clearable filterable placeholder="请选择">
        <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="2">
      <span class="selectlable">时间范围：</span>
    </el-col>
    <el-col :span="8">
      <div class="block">
        <el-date-picker v-model="time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </el-col>
    <el-col :span="7">
      <el-button-group>
        <el-tooltip class="item" effect="light" content="搜索信息" placement="bottom">
          <el-button type="primary" icon="el-icon-search" @click="getList()" size=small round>搜索</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="新增订单信息" placement="bottom">
          <el-button type="primary" icon="el-icon-document-add" @click="draweradd=true" size=small round>新增</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="删除" placement="bottom">
          <el-button type="primary" icon="el-icon-document-remove" @click="remove()" size=small round>删除</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="打印" placement="bottom">
          <el-button type='primary' icon="el-icon-printer" size=small round v-print="print">打印</el-button>
        </el-tooltip>
      </el-button-group>
    </el-col>
  </el-row>
  <el-row class="row">
    <el-col :span="24">
      <div style="display:none;">
        <el-table id="print" ref="print" :data="tableData" @selection-change="onTableSelectChange">
          <el-table-column prop="customerName" label="客户名称" width=100> </el-table-column>
          <el-table-column prop="poNum" label="PO#" width=100> </el-table-column>
          <el-table-column prop="item" label="ITEM" width=100> </el-table-column>
          <el-table-column prop="color" label="镀金颜色" width=100> </el-table-column>
          <el-table-column prop="count" label="数量" width=180> </el-table-column>
          <el-table-column prop="price" label="单价" width=80> </el-table-column>
          <el-table-column prop="sum" label="合计" width=80> </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width=100> </el-table-column>
        </el-table>
      </div>
      <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
        <el-table-column type="selection" width=60>
        </el-table-column>
        <el-table-column prop="customerName" label="客户名称" width=200> </el-table-column>
        <el-table-column prop="image" label="产品图片" width=100>
          <template slot-scope="scope">
            <div style="width:50%;height:50%;">
              <el-image :src="scope.row.image" :preview-src-list="[scope.row.image]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="poNum" label="PO#" width=180> </el-table-column>
        <el-table-column prop="item" label="ITEM" width=180> </el-table-column>
        <el-table-column prop="color" label="镀金颜色" width=100> </el-table-column>
        <el-table-column prop="count" label="数量" width=180> </el-table-column>
        <el-table-column prop="price" label="单价" width=60> </el-table-column>
        <el-table-column prop="sum" label="合计" width=80> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width=160> </el-table-column>
        <el-table-column label="操作" width=80>
          <template slot-scope="scope">
            <el-tooltip class="item" effect="light" content="详情" placement="bottom">
              <el-button type="primary" icon="el-icon-edit-outline" size="mini" circle @click="info(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
  <el-row>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[50, 200, 1000, 10000]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRowCount">
    </el-pagination>
  </el-row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'order',
  data() {
    var count = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var price = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      customerNameSelect: '',
      customerNameOptions: [],
      colorOptions: [],
      bakeOptions: [],
      formout: {},
      formoutupdate: {},
      pageIndex: 1,
      pageSize: 50,
      totalRowCount: 0,
      idarr: [],
      avatarUrl: '',
      customerNameItem: '',
      time: [],
      draweradd: false,
      drawerupdate: false,
      print: {
        id: 'print',
        popTitle: '订单',
        previewTitle: '订单',
      },
      rules: {
        count: [{
          validator: count,
          trigger: 'blur'
        }],
        price: [{
          validator: price,
          trigger: 'blur'
        }],
      },
      autoheight: 0,
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      }
    }
  },
  created() {
    this.getList()
    this.getType()
    this.autoheight = window.innerHeight - 250
    this.avatarUrl = this.global.apiUrl + 'outStorage/image'
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 100) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getType() {
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "customer"
          }
        })
        .then(res => {
          this.customerNameOptions = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "color"
          }
        })
        .then(res => {
          this.colorOptions = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "ct"
          }
        })
        .then(res => {
          this.bakeOptions = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })

    },
    getList() {
      console.log("this.time", this.time)
      let start = ''
      let end = ''
      if (this.time != null) {
        start = this.time[0]
        end = this.time[1]
      }
      axios
        .get(this.global.apiUrl + 'order', {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            customerNameItem: this.customerNameSelect,
            starttime: start,
            endtime: end
          }
        })
        .then(res => {
          this.tableData = res.data.list
          this.totalRowCount = res.data.totalRowCount
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    onTableSelectChange(row) {
      let idarr = []
      for (let item of row) {
        idarr.push(item.id)
      }
      this.idarr = idarr

    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    info(row) {
      this.drawerupdate = true
      this.formoutupdate = row
    },
    submitForm() {
      this.$refs['formout'].validate((valid) => {
        if (valid) {
          axios
            .post(this.global.apiUrl + 'order', this.formout, {
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
                this.getList()
                this.draweradd = false
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
      })
    },
    submitFormUpdate() {
      this.$refs['formoutupdate'].validate((valid) => {
        if (valid) {
          axios
            .put(this.global.apiUrl + 'order', this.formoutupdate, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(res => {
              if (res.data.s == "0") {
                this.$message({
                  showClose: true,
                  message: '修改成功',
                  type: 'success'
                });
                this.getList()
                this.drawerupdate = false
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
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    remove() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      axios
        .delete(this.global.apiUrl + 'order', {
          data: newArr
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          if (res.data.s == "0") {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.getList()
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
    handleAddSuccess(res, file) {
      if (res.s == 0) {
        console.log("success")
        this.$set(this.formout, "image", this.global.apiUrl + file.response.rs)
        this.formout.image = this.global.apiUrl + file.response.rs
      } else {
        this.$message({
          showClose: true,
          message: res.rs,
          type: 'error'
        });
      }
    },
    beforeAddUpload(file) {
      const isJPG = file.type === 'image/jpeg/png';
      const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!');
      }
      //return isJPG && isLt2M;
      return isLt2M;
    },
    handleUpdateSuccess(res, file) {
      if (res.s == 0) {
        console.log("success")
        this.$set(this.formoutupdate, "image", this.global.apiUrl + file.response.rs)
        this.formoutupdate.image = this.global.apiUrl + file.response.rs
      } else {
        this.$message({
          showClose: true,
          message: res.rs,
          type: 'error'
        });
      }
    },
    beforeUpdateUpload(file) {
      const isJPG = file.type === 'image/jpeg/png';
      const isLt2M = file.size / 1024 / 1024 < 10;
      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 或PNG格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      //return isJPG && isLt2M;
      return isLt2M;
    }
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
