import axios from 'axios'
import jutils from 'jutils-src'

export default {
  name: 'report',
  data() {
    return {
      ordermonth: '',
      inStoragemonth: '',
      orderStatistics: 0,
      inStorageStatistics: 0,
      orderByColor: [],
      authorities: [],
      reInStorageCount: 0,
      reInStorageRatio: 0
    }
  },
  created() {
    var data = new Date();
    data.setDate(1)
    data.setHours(0);
    data.setMinutes(0);
    data.setSeconds(0);
    data.setMilliseconds(0);
    let dataStr = jutils.formatDate(data,"YYYY-MM-DD HH:ii:ss")
    this.ordermonth = dataStr
    this.inStoragemonth = dataStr
    this.getOrderStatistics()
    this.getOrderStatisticsColor()

    this.$api.login.tokenVail().then(res => {
      if (res.data.s != 0) {
        this.$route.replace('/login')
      } else {
        this.authorities = res.data.rs.authorities
      }
    })
  },
  mounted() {

  },
  computed: {
    scrollerHeight: function() {
      return (window.innerHeight * 0.77) + 'px'; //自定义高度需求
    },
    heightRow1: function() {
      return (window.innerHeight * 0.06) + 'px'; //自定义高度需求
    },
    heightRow2: function() {
      return (window.innerHeight * 0.57) + 'px'; //自定义高度需求
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
        }
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
          let data = [
            ['score', 'amount', 'product']
          ]
          res.data.rs.forEach((item, index) => {
            let one = [item.ratio, item.count, item.color]
            data.push(one)
          })
          var myChart = this.$echarts.init(document.getElementById('echartstest'));
          console.log(data)
          var option = {
            dataset: {
              source: data
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              containLabel: true
            },
            xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              name: '金额（元）'
            },
            yAxis: {
              type: 'category',
            },
            visualMap: {
              orient: 'horizontal',
              left: 'center',
              min: 0,
              max: 100,
              text: ['100%', '0%'],
              // Map the score column to color
              dimension: 0,
              inRange: {
                color: ['#65B581', '#FFCE34', '#FD665F']
              }
            },
            series: [{
              name: '2011',
              type: 'bar',
              encode: {
                x: 'amount',
                y: 'product'
              },
            }]
          };
          myChart.setOption(option);
        }
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
      this.getOrderStatistics()
      this.getOrderStatisticsColor()
    },
    inStorageChange(e) {
      this.getInStorageStatistics()
      this.getInStorageStatisticsRatio()
    },
  }
}
