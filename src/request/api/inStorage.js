import axios from '@/request/http.js'; // 导入http中创建的axios实例

const order = {
  getList(params) {
    return axios.get(`/inStorage`, {
      params: params
    });
  },
  getById(params) {
    return axios.get(`/inStorage/id`, {
      params: params
    })
  },
  getByCode(params) {
    return axios.get(`/inStorage/code`, {
      params: params
    })
  },
  getListByIds(body) {
    return axios.post(`/inStorage/ids`, body)
  },
  save(body) {
    return axios.post(`/inStorage`, body)
  },
  update(body) {
    return axios.put(`/inStorage`, body)
  },
  delete(body) {
    return axios.delete(`/inStorage`, body)
  }
}

export default order;
