import moment from 'moment'
import companyinfo from './companyinfo'

export default {
  name: 'company',
  data() {
    return {
      pageSize: 20,
      pageIndex: 1,
      totalRowCount: 0,
      tableData: [],
      nameSelect: "",
      codeSelect: "",
    }
  },
  components: {
    companyinfo,
  },
  created() {
    this.autoheight = window.innerHeight - 250
    this.getList();
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getList() {
      let start = ''
      let end = ''
      if (this.time != null && this.time.length == 2) {
        start = moment(this.time[0]).format('YYYY-MM-DD HH:mm:ss')
        end = moment(this.time[1]).format('YYYY-MM-DD HH:mm:ss')
      }
      this.$api.company.getList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        name: this.nameSelect,
        code: this.codeSelect,
        starttime: start,
        endtime: end
      }).then(res => {
        let totalPrice = 0
        this.tableData = res.data.rs.list
        this.totalRowCount = res.data.rs.totalRowCount
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getList()
    },
    onTableSelectChange(row) {
      let idarr = []
      for (let item of row) {
        idarr.push(item.id)
      }
      this.idarr = idarr
    },
    toinfo(row) {
      this.$router.push('/company/info?id='+row.id)
    }
  }
}
