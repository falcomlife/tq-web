<template>
  <div class="content-body">
    <el-row class="row">
      <el-col :span="24">
        <!-- 订单审批详情 -->
        <el-drawer :visible.sync="drawerupdateorder" :with-header="false" size='70%'>
          <div style="padding: 2% 3%;">
            <el-tabs>
              <el-tab-pane label="流程审批" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;"
                           :style="{height: scrollerHeight}">
                <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                  <el-row class="row">
                    <el-col :span="12">
                      <el-card style="width: 98%;">
                        <i class="el-icon-s-order drawer-hard">修改前信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="订单编号">
                          <el-input disabled v-model="formoutupdate.jsource.code"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称">
                          <el-select disabled v-model="formoutupdate.jsource.customerNameId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="订单图片">
                          <el-upload disabled class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                                     :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload">
                            <img v-if="formoutupdate.jsource.image" :src="formoutupdate.jsource.image" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="PO#">
                          <el-input disabled v-model="formoutupdate.jsource.poNum"></el-input>
                        </el-form-item>
                        <el-form-item label="ITEM">
                          <el-input disabled v-model="formoutupdate.jsource.item"></el-input>
                        </el-form-item>
                        <el-form-item label="镀金颜色">
                          <el-select disabled v-model="formoutupdate.jsource.colorId" filterable placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="数量">
                          <el-input disabled type=number v-model="formoutupdate.jsource.count"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="每套组件数量">
                          <el-input disabled type=number v-model="formoutupdate.jsource.partCount"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="组件数量">
                          <el-input disabled type=number v-model="formoutupdate.jsource.partSumCount"></el-input>
                        </el-form-item>
                        <el-form-item label="单价">
                          <el-input disabled type=number v-model="formoutupdate.jsource.price"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="合计">
                          <el-input disabled type=number v-model="formoutupdate.jsource.sum"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input disabled v-model="formoutupdate.jsource.common"></el-input>
                        </el-form-item>
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                      <el-card style="width: 98%;">
                        <i class="el-icon-s-order drawer-hard">修改后信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="订单编号">
                          <el-input disabled v-model="formoutupdate.jtarget.code"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称">
                          <el-select disabled v-model="formoutupdate.jtarget.customerNameId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="订单图片">
                          <el-upload disabled class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                                     :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload">
                            <img v-if="formoutupdate.jtarget.image" :src="formoutupdate.jtarget.image" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="PO#">
                          <el-input disabled v-model="formoutupdate.jtarget.poNum"></el-input>
                        </el-form-item>
                        <el-form-item label="ITEM">
                          <el-input disabled v-model="formoutupdate.jtarget.item"></el-input>
                        </el-form-item>
                        <el-form-item label="镀金颜色">
                          <el-select disabled v-model="formoutupdate.jtarget.colorId" filterable placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="数量">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.count"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="每套组件数量">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.partCount"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="组件数量">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.partSumCount"></el-input>
                        </el-form-item>
                        <el-form-item label="单价">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.price"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="合计">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.sum"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input disabled v-model="formoutupdate.jtarget.common"></el-input>
                        </el-form-item>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <el-button v-if="formoutupdate.status == 1" type="primary" @click="pass()">审核通过</el-button>
                    <el-button v-if="formoutupdate.status == 1" type="primary" @click="reject()">驳回</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-drawer>
        <!-- 入库审批详情 -->
        <el-drawer :visible.sync="drawerupdatein" :with-header="false" size='70%'>
          <div style="padding: 2% 3%;">
            <el-tabs>
              <el-tab-pane label="流程审批" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;"
                           :style="{height: scrollerHeight}">
                <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                  <el-row class="row">
                    <el-col :span="12">
                      <el-card style="width: 98%;">
                        <i class="el-icon-s-order drawer-hard">修改前信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="订单编号">
                          <el-select disabled v-model="formoutupdate.jsource.orderCode" filterable remote
                                     reserve-keyword placeholder="请输入订单编号">
                            <el-option v-for="item in orderOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="客户名称">
                          <el-select disabled v-model="formoutupdate.jsource.customerNameId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="PO#">
                          <el-input disabled v-model="formoutupdate.jsource.poNum"></el-input>
                        </el-form-item>
                        <el-form-item label="ITEM">
                          <el-input disabled v-model="formoutupdate.jsource.item"></el-input>
                        </el-form-item>
                        <el-form-item label="订单镀金颜色">
                          <el-select disabled v-model="formoutupdate.jsource.orderColorId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="烤厅">
                          <el-select disabled v-model="formoutupdate.jsource.bakeId" filterable placeholder="请选择">
                            <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="总订单量">
                          <el-input disabled v-model="formoutupdate.jsource.count"></el-input>
                        </el-form-item>
                      </el-card>
                      <el-card style="margin-top:3%;width: 98%;">
                        <i class="el-icon-s-claim drawer-hard">入库信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="品名">
                          <el-input disabled v-model="formoutupdate.jsource.name"></el-input>
                        </el-form-item>
                        <el-form-item label="产品图片">
                          <el-upload disabled class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                                     :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                            <img v-if="formoutupdate.jsource.image" :src="formoutupdate.jsource.image" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="入库镀金颜色">
                          <el-select disabled v-model="formoutupdate.jsource.colorId" filterable placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="烤厅">
                          <el-select disabled v-model="formoutupdate.jsource.bakeId" filterable placeholder="请选择">
                            <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="来料类别">
                          <el-select disabled v-model="formoutupdate.jsource.incomingTypeId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="出库编号"
                                      v-if="formoutupdate.jsource.incomingTypeId==5 || formoutupdate.jsource.incomingTypeId==='30bc0ec552cb4a59a23c680362219ecf'">
                          <el-select disabled v-model="formoutupdate.jsource.outStorageCode" filterable reserve-keyword
                                     placeholder="请输入订单编号" :loading="outStorageLoading"
                                     @change="outStorageCodeChange">
                            <el-option v-for="item in outStorageCodeOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="不良原因"
                                      v-if="formoutupdate.jsource.incomingTypeId==='30bc0ec552cb4a59a23c680362219ecf'">
                          <el-input disabled v-model="formoutupdate.jsource.badReason"></el-input>
                        </el-form-item>
                        <el-form-item label="返镀原因" v-if="formoutupdate.jsource.incomingTypeId==5">
                          <el-input disabled v-model="formoutupdate.jsource.incomingReason"></el-input>
                        </el-form-item>
                        <el-form-item label="组件数">
                          <el-input disabled type=number v-model="formoutupdate.jsource.bunchCount"></el-input>
                        </el-form-item>
                        <el-form-item label="单位">
                          <el-select disabled v-model="formoutupdate.jsource.unitId" filterable placeholder="请选择">
                            <el-option v-for="item in unitOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="数量说明">
                          <el-input disabled v-model="formoutupdate.jsource.inCount"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input disabled v-model="formoutupdate.jsource.common"></el-input>
                        </el-form-item>
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                      <el-card style="width: 98%;">
                        <i class="el-icon-s-order drawer-hard">修改后信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="订单编号">
                          <el-select disabled v-model="formoutupdate.jtarget.orderCode" filterable remote
                                     reserve-keyword placeholder="请输入订单编号">
                            <el-option v-for="item in orderOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="客户名称">
                          <el-select disabled v-model="formoutupdate.jtarget.customerNameId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="PO#">
                          <el-input disabled v-model="formoutupdate.jtarget.poNum"></el-input>
                        </el-form-item>
                        <el-form-item label="ITEM">
                          <el-input disabled v-model="formoutupdate.jtarget.item"></el-input>
                        </el-form-item>
                        <el-form-item label="订单镀金颜色">
                          <el-select disabled v-model="formoutupdate.jtarget.orderColorId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="烤厅">
                          <el-select disabled v-model="formoutupdate.jtarget.bakeId" filterable placeholder="请选择">
                            <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="总订单量">
                          <el-input v-model="formoutupdate.jtarget.count" disabled></el-input>
                        </el-form-item>
                      </el-card>
                      <el-card style="margin-top:3%;width: 98%;">
                        <i class="el-icon-s-claim drawer-hard">入库信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="品名">
                          <el-input disabled v-model="formoutupdate.jtarget.name"></el-input>
                        </el-form-item>
                        <el-form-item label="产品图片">
                          <el-upload disabled class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                                     :on-success="handleAddSuccess" :before-upload="beforeAddUpload">
                            <img v-if="formoutupdate.jtarget.image" :src="formoutupdate.jtarget.image" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="入库镀金颜色">
                          <el-select disabled v-model="formoutupdate.jtarget.colorId" filterable placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="烤厅">
                          <el-select disabled v-model="formoutupdate.jtarget.bakeId" filterable placeholder="请选择">
                            <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="来料类别">
                          <el-select disabled v-model="formoutupdate.jtarget.incomingTypeId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in incomingTypeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="出库编号"
                                      v-if="formoutupdate.jtarget.incomingTypeId==5 || formoutupdate.jtarget.incomingTypeId==='30bc0ec552cb4a59a23c680362219ecf'">
                          <el-select disabled v-model="formoutupdate.jtarget.outStorageCode" filterable reserve-keyword
                                     placeholder="请输入订单编号" :loading="outStorageLoading"
                                     @change="outStorageCodeChange">
                            <el-option v-for="item in outStorageCodeOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="不良原因"
                                      v-if="formoutupdate.jtarget.incomingTypeId==='30bc0ec552cb4a59a23c680362219ecf'">
                          <el-input disabled v-model="formoutupdate.jtarget.badReason"></el-input>
                        </el-form-item>
                        <el-form-item label="返镀原因" v-if="formoutupdate.jtarget.incomingTypeId==5">
                          <el-input disabled v-model="formoutupdate.jtarget.incomingReason"></el-input>
                        </el-form-item>
                        <el-form-item label="组件数">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.bunchCount"></el-input>
                        </el-form-item>
                        <el-form-item label="单位">
                          <el-select disabled v-model="formoutupdate.jtarget.unitId" filterable placeholder="请选择">
                            <el-option v-for="item in unitOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="数量说明">
                          <el-input disabled v-model="formoutupdate.jtarget.inCount"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input disabled v-model="formoutupdate.jtarget.common"></el-input>
                        </el-form-item>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <el-button v-if="formoutupdate.status == 1" type="primary" @click="pass()">审核通过</el-button>
                    <el-button v-if="formoutupdate.status == 1" type="primary" @click="reject()">驳回</el-button>
                  </el-form-item>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-drawer>
        <!-- 出库审批详情 -->
        <el-drawer :visible.sync="drawerupdateout" :with-header="false" size='70%'>
          <div style="padding: 2% 3%;">
            <el-tabs>
              <el-tab-pane label="流程审批" style="margin-top:4%;padding: 0% 5%;overflow-y: scroll;"
                           :style="{height: scrollerHeight}">
                <el-form ref="formoutupdate" :rules="rules" :model="formoutupdate" size="small">
                  <el-row class="row">
                    <el-col :span="12">
                      <el-card style="margin-top:3%;width: 98%;">
                        <i class="el-icon-s-order drawer-hard">修改前信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="入库编号">
                          <el-select disabled v-model="formoutupdate.jsource.inStorageCode" filterable remote
                                     reserve-keyword placeholder="请输入订单编号" :remote-method="getInStorageByCode"
                                     :loading="inStorageLoading" @change="inStorageCodeChange">
                            <el-option v-for="item in inStorageOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="客户名称">
                          <el-select disabled v-model="formoutupdate.jsource.customerNameId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="品名">
                          <el-input disabled v-model="formoutupdate.jsource.name"></el-input>
                        </el-form-item>
                        <el-form-item label="PO#">
                          <el-input disabled v-model="formoutupdate.jsource.poNum"></el-input>
                        </el-form-item>
                        <el-form-item label="ITEM">
                          <el-input disabled v-model="formoutupdate.jsource.item"></el-input>
                        </el-form-item>
                        <el-form-item label="订单总量">
                          <el-input disabled v-model="formoutupdate.jsource.count"></el-input>
                        </el-form-item>
                        <el-form-item label="产品图片">
                          <el-upload disabled class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                                     :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload">
                            <img v-if="formoutupdate.jsource.image" :src="formoutupdate.jsource.image" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="镀金颜色">
                          <el-select disabled v-model="formoutupdate.jsource.colorId" filterable placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="烤厅">
                          <el-select disabled v-model="formoutupdate.jsource.bakeId" filterable placeholder="请选择">
                            <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-card>
                      <el-card style="margin-top:3%;width: 98%;">
                        <i class="el-icon-s-order drawer-hard">出库信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="组件数">
                          <el-input disabled type=number v-model="formoutupdate.jsource.bunchCount"></el-input>
                        </el-form-item>
                        <el-form-item label="数量说明">
                          <el-input disabled v-model="formoutupdate.jsource.outCount"></el-input>
                        </el-form-item>
                        <el-form-item label="出库类型">
                          <el-select disabled v-model="formoutupdate.jsource.outTypeId" filterable placeholder="请选择">
                            <el-option v-for="item in outTypeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input disabled v-model="formoutupdate.jsource.common"></el-input>
                        </el-form-item>
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                      <el-card style="margin-top:3%;width: 98%;">
                        <i class="el-icon-s-order drawer-hard">修改后信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="入库编号">
                          <el-select disabled v-model="formoutupdate.jtarget.inStorageCode" filterable remote
                                     reserve-keyword placeholder="请输入订单编号" :remote-method="getInStorageByCode"
                                     :loading="inStorageLoading" @change="inStorageCodeChange">
                            <el-option v-for="item in inStorageOptions" :key="item.value" :label="item.label"
                                       :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="客户名称">
                          <el-select disabled v-model="formoutupdate.jtarget.customerNameId" filterable
                                     placeholder="请选择">
                            <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="品名">
                          <el-input disabled v-model="formoutupdate.jtarget.name"></el-input>
                        </el-form-item>
                        <el-form-item label="PO#">
                          <el-input disabled v-model="formoutupdate.jtarget.poNum"></el-input>
                        </el-form-item>
                        <el-form-item label="ITEM">
                          <el-input disabled v-model="formoutupdate.jtarget.item"></el-input>
                        </el-form-item>
                        <el-form-item label="订单总量">
                          <el-input disabled v-model="formoutupdate.jtarget.count"></el-input>
                        </el-form-item>
                        <el-form-item label="产品图片">
                          <el-upload disabled class="avatar-uploader" :action="avatarUrl" :show-file-list="false"
                                     :on-success="handleUpdateSuccess" :before-upload="beforeUpdateUpload">
                            <img v-if="formoutupdate.jtarget.image" :src="formoutupdate.jtarget.image" class="avatar"/>
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                          </el-upload>
                        </el-form-item>
                        <el-form-item label="镀金颜色">
                          <el-select disabled v-model="formoutupdate.jtarget.colorId" filterable placeholder="请选择">
                            <el-option v-for="item in colorOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="烤厅">
                          <el-select disabled v-model="formoutupdate.jtarget.bakeId" filterable placeholder="请选择">
                            <el-option v-for="item in bakeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-card>
                      <el-card style="margin-top:3%;width: 98%;">
                        <i class="el-icon-s-order drawer-hard">出库信息</i>
                        <el-divider></el-divider>
                        <el-form-item label="组件数">
                          <el-input disabled type=number v-model="formoutupdate.jtarget.bunchCount"></el-input>
                        </el-form-item>
                        <el-form-item label="数量说明">
                          <el-input disabled v-model="formoutupdate.jtarget.outCount"></el-input>
                        </el-form-item>
                        <el-form-item label="出库类型">
                          <el-select disabled v-model="formoutupdate.jtarget.outTypeId" filterable placeholder="请选择">
                            <el-option v-for="item in outTypeOptions" :key="item.id" :label="item.itemName"
                                       :value="item.id">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input disabled v-model="formoutupdate.jtarget.common"></el-input>
                        </el-form-item>
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-form-item>
                    <el-button v-if="formoutupdate.status == 1" type="primary" @click="pass()">审核通过</el-button>
                    <el-button v-if="formoutupdate.status == 1" type="primary" @click="reject()">驳回</el-button>
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
        <span class="selectlable">客户名称</span>
      </el-col>
      <el-col :span="4">
        <el-select size=mini v-model="customerNameSelect" clearable filterable placeholder="请选择">
          <el-option v-for="item in customerNameOptions" :key="item.id" :label="item.itemName" :value="item.id">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <span class="selectlable">编号</span>
      </el-col>
      <el-col :span="4">
        <el-input size=mini style="width:80%;" v-model="codeSelect" placeholder="请输入编号" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <span class="selectlable">时间范围</span>
      </el-col>
      <el-col :span="5">
        <div class="block">
          <el-date-picker size=mini style="width:80%;" v-model="time" type="daterange" align="right" unlink-panels
                          range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                          :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :span="6">
        <el-button-group>
          <el-tooltip class="item" effect="light" content="搜索信息" placement="bottom">
            <el-button type="primary" icon="el-icon-search" @click="getList()" size=small round>搜索</el-button>
          </el-tooltip>
        </el-button-group>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="24">
        <el-table :data="tableData" :height="autoheight" @selection-change="onTableSelectChange">
          <el-table-column prop="customerName" label="客户名称" width=200></el-table-column>
          <el-table-column prop="code" label="编号" width=200></el-table-column>
          <el-table-column prop="typeName" label="类型" width=100></el-table-column>
          <el-table-column prop="statusName" label="状态" width=100></el-table-column>
          <el-table-column prop="common" label="备注" width=800></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width=100></el-table-column>
          <el-table-column label="操作" width=80>
            <template slot-scope="scope">
              <el-tooltip class="item" effect="light" content="审批" placement="bottom">
                <el-button type="primary" icon="el-icon-edit-outline" size=mini circle
                           @click="info(scope.row)"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
                     :page-sizes="[5, 20, 100, 500]" :page-size="10" layout="total, sizes, prev, pager, next, jumper"
                     :total="totalRowCount">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import processModify from "./processModify.js"

export default processModify
</script>

<style>
@import 'processModify.css'
</style>
