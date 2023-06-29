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
  },
  getOrderStatisticsCustomer(params) {
    return axios.get(`/order/statistics/customer`, {
      params: params
    })
  },
  getOrderStatisticsCustomerExcel(params) {
      return axios.get(`/order/statistics/customer/excel`,{
        params: params,
        responseType: 'blob'
      });
  },
}

export default order;
