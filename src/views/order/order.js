import expandRow from './expandRow'
import moment from 'moment'
import * as math from 'mathjs'
export default {
  name: 'order',
  data() {
    return {
      tableData: [],
      customerNameSelect: '',
      customerNameOptions: [],
      colorOptions: [],
      bakeOptions: [],
      codeSelect: '',
      poSelect: '',
      itemSelect: '',
      totalPrice: 0,
      formout: {
        customerName: '',
        poNum: '',
        item: '',
        color: '',
        count: '',
        price: '',
        sum: '',
      },
      formoutupdate: {
        customerName: '',
        poNum: '',
        item: '',
        color: '',
        count: '',
        price: '',
        sum: '',
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
      print: {
        id: 'print',
        popTitle: '订单',
        previewTitle: '订单',
      },
      rules: {},
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
  components: {
    expandRow
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
      this.$api.dict.getDict({
        type: "customer"
      }).then(res => {
        this.customerNameOptions = res.data.rs
      })
      this.$api.dict.getDict({
        type: "color"
      }).then(res => {
        this.colorOptions = res.data.rs
      })
      this.$api.dict.getDict({
        type: "ct"
      }).then(res => {
        this.bakeOptions = res.data.rs
      })
    },
    getList() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$api.order.getList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        customerNameItem: this.customerNameSelect,
        code: this.codeSelect,
        po: this.poSelect,
        item: this.itemSelect,
        starttime: start,
        endtime: end
      }).then(res => {
        let totalPrice = 0
        this.tableData = res.data.rs.list
        this.totalRowCount = res.data.rs.totalRowCount
        res.data.rs.list.forEach((item) => {
          totalPrice = this.calculate(totalPrice + item.sum)
        })
        this.totalPrice = totalPrice
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
          this.$api.order.save(this.formout)
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
            })
        }
      })
    },
    submitFormUpdate() {
      this.$refs['formoutupdate'].validate((valid) => {
        if (valid) {
          this.$api.order.update(this.formoutupdate)
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
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    remove() {
      let newArr = JSON.parse(JSON.stringify(this.idarr))
      this.$api.order.delete({
          data: newArr
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
    },
    formoutValueChange() {
      this.formout.sum = this.calculate(this.formout.count * this.formout.price)
    },
    formoutupdateValueChange() {
      this.formoutupdate.sum = this.calculate(this.formoutupdate.count * this.formoutupdate.price)
      console.log(this.formoutupdate)
    },
    calculate(value) {
      const precision = 14
      return Number(math.format(value, precision))
    },
    getCurrentTime() {
      //获取当前时间并打印
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
      let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
      let date = yy + '年' + mm + '月' + dd + '日';
      let time = yy + '/' + mm + '/' + dd + ' ' + hh + ':' + mf + ':' + ss;
      return date;
    },
    exportExcel() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$api.order.exportExcel({
        customerNameItem: this.customerNameSelect,
        code: this.codeSelect,
        po: this.poSelect,
        item: this.itemSelect,
        starttime: start,
        endtime: end
      }).then(
        res => {
          var blob = new Blob([res.data], {
            type: `application/vnd.ms-excel`
          })
          const link = document.createElement('a')
          const name = `订单明细.xlsx`
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$message({
            title: '成功',
            message: '导出成功！',
            type: 'success',
            duration: 1000
          })
        })
    }
  }
}
