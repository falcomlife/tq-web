import axios from '@/request/http.js'; // 导入http中创建的axios实例

const order = {
  getOrderStatistics(params) {
    return axios.get(`/order/statistics`, {
      params: params
    })
  },
  getOrderStatisticsColor(params) {
    return axios.get(`/order/statistics/color`, {
      params: params
    })
  },
  getInStorageStatistics(params) {
    return axios.get(`/inStorage/statistics`, {
      params: params
    })
  },
  getInStorageStatisticsRatio(params) {
    return axios.get(`/inStorage/statistics/reratio`, {
      params: params
    })
  }
}

export default order;
