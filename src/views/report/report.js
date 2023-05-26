
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
    this.$api.login.tokenVail().then(res => {
      if(res.data.s != 0){
        this.$route.replace('/login')
      }
    })
    this.autoheight = window.innerHeight / 2 - 200
  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight - 150) + 'px'; //自定义高度需求
    },
    scrollerHeightDiv: function() {
      return (window.innerHeight - 400) + 'px'; //自定义高度需求
    }
  },
  methods: {
    getOrderStatistics() {
      if (this.ordermonth == null) {
        this.orderStatistics = 0
        return
      }
      this.$api.report.getOrderStatistics({
        time: this.ordermonth,
      }).then(res => {
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
      this.$api.report.getOrderStatisticsColor({
        time: this.ordermonth,
      }).then(res => {
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
      this.$api.report.getInStorageStatistics({
        time: this.inStoragemonth,
      }).then(res => {
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
      this.$api.report.getInStorageStatisticsRatio({
        time: this.inStoragemonth,
      }).then(res => {
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
