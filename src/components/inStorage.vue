<template>
<div>
  <el-row class="row">
    <el-col :span="24">
      <!-- 新建 -->
      <el-drawer :visible.sync="draweradd" :with-header="false" size='50%'>
        <div style="padding: 2% 3%;">
          <el-tabs>
            <el-tab-pane label="新增入库" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formout" :rules="rules" :model="formout" size="small">
                <el-card>
                  <i class="el-icon-s-order drawer-hard">订单信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="订单编号" prop="orderId">
                    <el-select v-model="formout.orderId" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getOrderByCode" :loading="orderLoading" @change="orderCodeChange">
                      <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客户名称" prop="customerName">
                    <el-select v-model="formout.customerName" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="PO#" prop="poNum">
                    <el-input v-model="formout.poNum" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="ITEM" prop="item">
                    <el-input v-model="formout.item" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单镀金颜色" prop="orderColor">
                    <el-select v-model="formout.orderColor" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="总订单量" prop="count">
                    <el-input v-model="formout.count" disabled></el-input>
                  </el-form-item>
                </el-card>
                <el-card style="margin-top:3%;">
                  <i class="el-icon-s-claim drawer-hard">入库信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="品名" prop="name">
                    <el-input v-model="formout.name"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="产品图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                      <img v-if="formout.image" :src="formout.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item :required=true label="入库镀金颜色" prop="color">
                    <el-select v-model="formout.color" filterable placeholder="请选择">
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="烤厅" prop="bake">
                    <el-select v-model="formout.bake" filterable placeholder="请选择">
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="来料类别" prop="incomingType">
                    <el-select v-model="formout.incomingType" filterable placeholder="请选择">
                      <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出库编号" prop="outStorageId" v-if="formout.incomingType==5">
                    <el-select v-model="formout.outStorageId" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getOutStorageByCode" :loading="outStorageLoading" @change="outStorageCodeChange">
                      <el-option v-for="item in outStorageCodeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="返镀原因" prop="incomingReason" v-if="formout.incomingType==5">
                    <el-input v-model="formout.incomingReason"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="总个数" prop="bunchCount">
                    <el-input type=number v-model="formout.bunchCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="入库数量" prop="inCount">
                    <el-input v-model="formout.inCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="单位" prop="unit">
                    <el-select v-model="formout.unit" filterable placeholder="请选择">
                      <el-option v-for="item in unitOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="resetForm('formout')">重置</el-button>
                  </el-form-item>
                </el-card>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
      <!-- 详情 -->
      <el-drawer :visible.sync="drawerupdate" :with-header="false" size='50%'>
        <div style="padding: 2% 3%;">
          <el-tabs>
            <el-tab-pane label="编辑入库" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;" :style="{height: scrollerHeight}">
              <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                <el-card>
                  <i class="el-icon-s-order drawer-hard">订单信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="订单编号" prop="orderCode">
                    <el-select v-model="formoutupdate.orderCode" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getOrderByCode" :loading="orderLoading" @change="orderCodeChange">
                      <el-option v-for="item in orderOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="客户名称" prop="customerNameId">
                    <el-select v-model="formoutupdate.customerNameId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="PO#" prop="poNum">
                    <el-input v-model="formoutupdate.poNum" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="ITEM" prop="item">
                    <el-input v-model="formoutupdate.item" disabled></el-input>
                  </el-form-item>
                  <el-form-item label="订单镀金颜色" prop="orderColorId">
                    <el-select v-model="formoutupdate.orderColorId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="烤厅" prop="bakeId">
                    <el-select v-model="formoutupdate.bakeId" filterable placeholder="请选择" disabled>
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="总订单量" prop="count">
                    <el-input v-model="formoutupdate.count" disabled></el-input>
                  </el-form-item>
                </el-card>
                <el-card style="margin-top:3%;">
                  <i class="el-icon-s-claim drawer-hard">入库信息</i>
                  <el-divider> </el-divider>
                  <el-form-item :required=true label="品名" prop="name">
                    <el-input v-model="formoutupdate.name"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="产品图片" prop="image">
                    <el-upload class="avatar-uploader" :action="avatarUrl" :show-file-list="false" :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                      <img v-if="formoutupdate.image" :src="formoutupdate.image" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="入库镀金颜色" prop="colorId">
                    <el-select v-model="formoutupdate.colorId" filterable placeholder="请选择">
                      <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="烤厅" prop="bakeId">
                    <el-select v-model="formoutupdate.bakeId" filterable placeholder="请选择">
                      <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="来料类别" prop="incomingTypeId">
                    <el-select v-model="formoutupdate.incomingTypeId" filterable placeholder="请选择">
                      <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="出库编号" prop="outStorageCode" v-if="formoutupdate.incomingTypeId==5">
                    <el-select v-model="formoutupdate.outStorageCode" filterable remote reserve-keyword placeholder="请输入订单编号" :remote-method="getOutStorageByCode" :loading="outStorageLoading" @change="outStorageCodeChange">
                      <el-option v-for="item in outStorageCodeOptions" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="返镀原因" prop="incomingReason" v-if="formoutupdate.incomingTypeId==5">
                    <el-input v-model="formoutupdate.incomingReason"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="总个数" prop="bunchCount">
                    <el-input type=number v-model="formoutupdate.bunchCount"></el-input>
                  </el-form-item>
                  <el-form-item :required=true label="单位" prop="unitId">
                    <el-select v-model="formoutupdate.unitId" filterable placeholder="请选择">
                      <el-option v-for="item in unitOptions" :key="item.id" :label="item.itemName" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item :required=true label="入库数量" prop="inCount">
                    <el-input v-model="formoutupdate.inCount"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitFormUpdate()">提交修改</el-button>
                  </el-form-item>
                </el-card>
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
    <el-col :span="4">
      <el-select v-model="customerNameSelect" clearable filterable placeholder="请选择">
        <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="1">
      <span class="selectlable">编号</span>
    </el-col>
    <el-col :span="4">
      <el-input style="width:80%;" v-model="codeSelect" placeholder="请输入编号" clearable></el-input>
    </el-col>
    <el-col :span="2">
      <span class="selectlable">时间范围：</span>
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
        <el-tooltip class="item" effect="light" content="新增入库信息" placement="bottom">
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
      <div style="display: none;">
        <div id="print" ref="print">
          <div v-for="(item) in tableDataPrint" style="float: left;width: 50%;" :style="{height: printCellHeight}" :key="item.id">
            <div>
              <div style="float:left;width:49%;">
                <el-image :src="item.image" style="width:100%;" :style="{height: printCellHeight}" :fit="fill"></el-image>
              </div>
              <div style="float:left;width:45%;margin-left:5%;">
                <el-descriptions :size="mini" column="1" content-class-name="self-descriptions-item">
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="客户名称">
                    <font color="red">{{item.customerName}}</font>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="编号">{{item.code}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="品名">{{item.name}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="入库镀金颜色">
                    <font color="red">{{item.color}}</font>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="烤厅">{{item.bake}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="总个数">{{item.bunchCount}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="入库数量">
                    <font color="red">{{item.inCount}}</font>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="来料类别">
                    <el-tag size="small">{{item.incomingType}}</el-tag>
                  </el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="创建时间">{{item.createTime}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="PO#">{{item.poNum}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="ITEM">{{item.item}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="总订单量">{{item.count}}</el-descriptions-item>
                  <el-descriptions-item content-class-name="self-descriptions-item" label-class-name="self-descriptions-item" label="订单镀金颜色">{{item.orderColor}}</el-descriptions-item>
                </el-descriptions>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
        <el-table-column type="selection" width=60>
        </el-table-column>
        <el-table-column prop="customerName" label="入库客户名称" width=110> </el-table-column>
        <el-table-column prop="image" label="产品图片" width=100>
          <template slot-scope="scope">
            <div style="width:50%;height:50%;">
              <el-image :src="scope.row.image" :fit="contain" :preview-src-list="[scope.row.image]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="编号" width=120> </el-table-column>
        <el-table-column prop="name" label="品名" width=120> </el-table-column>
        <el-table-column prop="poNum" label="PO#" width=160> </el-table-column>
        <el-table-column prop="item" label="ITEM" width=160> </el-table-column>
        <el-table-column prop="orderColor" label="订单镀金颜色" width=110> </el-table-column>
        <el-table-column prop="color" label="入库镀金颜色" width=110> </el-table-column>
        <el-table-column prop="bake" label="烤厅" width=60> </el-table-column>
        <el-table-column prop="count" label="总订单量" width=100> </el-table-column>
        <el-table-column prop="bunchCount" label="总个数" width=70> </el-table-column>
        <el-table-column prop="unit" label="单位" width=50> </el-table-column>
        <el-table-column prop="inCount" label="入库数量" width=80> </el-table-column>
        <el-table-column prop="incomingType" label="来料类别" width=80> </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width=140> </el-table-column>
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
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[20, 50, 100, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="totalRowCount">
    </el-pagination>
  </el-row>
</div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'inStorage',
  data() {
    var color = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var orderCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var image = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var name = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var bake = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var bunchCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    var inCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var incomingType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'));
      } else if (value.length > 100) {
        return callback(new Error('长度不能超过100'));
      } else {
        callback();
      }
    };
    var outStorageCode = (rule, value, callback) => {
      if (!value && this.formout.incomingType == 5) {
        return callback(new Error('不能为空'));
      } else {
        callback();
      }
    };
    return {
      tableData: [],
      tableDataPrint: [],
      customerNameSelect: '',
      customerNameOptions: [],
      colorOptions: [],
      bakeOptions: [],
      incomingTypeOptions: [],
      orderOptions: [],
      outStorageCodeOptions: [],
      unitOptions: [{
        id: "1",
        itemName: "个"
      }, {
        id: "2",
        itemName: "千克"
      }, {
        id: "3",
        itemName: "克"
      }],
      codeSelect: '',
      formmodule: {
        id: "",
        tempOrderId: "",
        orderId: "",
        orderCode: "",
        code: "",
        customerName: "",
        customerNameId: "",
        image: "",
        name: "",
        poNum: "",
        item: "",
        color: "",
        colorId: "",
        count: "",
        bunchCount: "",
        bake: "",
        bakeId: "",
        inCount: "",
        price: "",
        sum: "",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      formout: {
        id: "",
        tempOrderId: "",
        orderId: "",
        orderCode: "",
        code: "",
        customerName: "",
        customerNameId: "",
        image: "",
        name: "",
        poNum: "",
        item: "",
        color: "",
        colorId: "",
        count: "",
        bunchCount: "",
        bake: "",
        bakeId: "",
        inCount: "",
        price: "",
        sum: "",
        unit: "个",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      formoutupdate: {
        id: "",
        tempOrderId: "",
        orderId: "",
        orderCode: "",
        code: "",
        customerName: "",
        customerNameId: "",
        image: "",
        name: "",
        poNum: "",
        item: "",
        color: "",
        colorId: "",
        count: "",
        bunchCount: "",
        bake: "",
        bakeId: "",
        inCount: "",
        price: "",
        sum: "",
        incomingType: "",
        incomingTypeId: "",
        createTime: "",
        modifiedTime: "",
        isDelete: "",
      },
      pageIndex: 1,
      pageSize: 20,
      totalRowCount: 0,
      idarr: [],
      avatarUrl: '',
      customerNameItem: '',
      time: [],
      draweradd: false,
      drawerupdate: false,
      orderLoading: false,
      outStorageLoading: false,
      print: {
        id: 'print',
        popTitle: '入库单',
        previewTitle: '入库单',
        extraHead: "",
      },
      rules: {
        orderCode: [{
          validator: orderCode,
          trigger: 'blur'
        }],
        color: [{
          validator: color,
          trigger: 'blur'
        }],
        name: [{
          validator: name,
          trigger: 'blur'
        }],
        image: [{
          validator: image,
          trigger: 'blur'
        }],
        bake: [{
          validator: bake,
          trigger: 'blur'
        }],
        bunchCount: [{
          validator: bunchCount,
          trigger: 'blur'
        }],
        inCount: [{
          validator: inCount,
          trigger: 'blur'
        }],
        incomingType: [{
          validator: incomingType,
          trigger: 'blur'
        }],
        outStorageCode: [{
          validator: outStorageCode,
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
    },
    printCellHeight: function() {
      return (window.innerHeight) * 0.82 + 'px'; //自定义高度需求
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
      axios
        .get(this.global.apiUrl + 'dict/items', {
          params: {
            type: "incomingtype"
          }
        })
        .then(res => {
          this.incomingTypeOptions = res.data.rs
        })
        .catch(function(error) {
          console.log(error)
        })

    },
    getList() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      axios
        .get(this.global.apiUrl + 'inStorage', {
          params: {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            customerNameItem: this.customerNameSelect,
            code: this.codeSelect,
            starttime: start,
            endtime: end
          }
        })
        .then(res => {
          this.tableData = res.data.list
          this.tableDataPrint = res.data.list
          this.totalRowCount = res.data.totalRowCount
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getListByIds(idarr) {
      axios
        .post(this.global.apiUrl + 'inStorage/ids', idarr, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
          this.tableDataPrint = res.data
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
      if (idarr != 0) {
        let newArr = JSON.parse(JSON.stringify(idarr))
        this.getListByIds(newArr)
      }
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
          if("个" == this.formout.unit){
            this.formout.unit = 1
          }
          axios
            .post(this.global.apiUrl + 'inStorage', this.formout, {
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
              this.$refs['formout'].resetFields();
              this.formout.unit = "个"
            })
            .catch(function(error) {
              console.log(error)
              this.$refs['formout'].resetFields();
              this.formout.unit = "个"
            })
        }
      })
    },
    submitFormUpdate() {
      this.$refs['formoutupdate'].validate((valid) => {
        if (valid) {
          if (typeof this.formoutupdate.tempOrderId != "undefined") {
            this.formoutupdate.orderId = this.formoutupdate.tempOrderId
          }
          if (typeof this.formoutupdate.tempOutStorageId != "undefined") {
            this.formoutupdate.outStorageId = this.formoutupdate.tempOutStorageId
          }
          axios
            .put(this.global.apiUrl + 'inStorage', this.formoutupdate, {
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
              this.$refs['formoutupdate'].resetFields();
            })
            .catch(function(error) {
              console.log(error)
              this.$refs['formoutupdate'].resetFields();
            })
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formout.unit = "个"
    },
    remove() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      axios
        .delete(this.global.apiUrl + 'inStorage', {
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
    },
    getOrderByCode(code) {
      axios
        .get(this.global.apiUrl + 'order/code', {
          params: {
            code: code
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.orderOptions = res.data.rs
            this.orderLoading = false
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
    orderCodeChange(orderId) {
      this.formoutupdate.tempOrderId = this.formoutupdate.orderCode
      axios
        .get(this.global.apiUrl + 'order/id', {
          params: {
            id: orderId
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.formout.customerName = res.data.rs.customerName
            this.formout.poNum = res.data.rs.poNum
            this.formout.item = res.data.rs.item
            this.formout.count = res.data.rs.count
            this.formout.orderColor = res.data.rs.color

            this.formoutupdate.customerNameId = res.data.rs.customerName
            this.formoutupdate.poNum = res.data.rs.poNum
            this.formoutupdate.item = res.data.rs.item
            this.formoutupdate.count = res.data.rs.count
            this.formoutupdate.orderColorId = res.data.rs.color
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
    getOutStorageByCode(code) {
      axios
        .get(this.global.apiUrl + 'outStorage/code', {
          params: {
            code: code
          }
        })
        .then(res => {
          if (res.data.s == 0) {
            this.outStorageCodeOptions = res.data.rs
            this.outStorageLoading = false
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
    outStorageCodeChange() {
      this.formoutupdate.tempOutStorageId = this.formoutupdate.outStorageCode
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

.drawer-hard {
  font-size: 24px;
  color: #909399;
  font-weight: bold;
}

.self-descriptions-item {
  font-size: 17px;
  padding-bottom: 2px;
}

.el-descriptions-item__cell {
  padding-bottom: 2px;
}
</style>
