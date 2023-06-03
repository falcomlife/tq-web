import axios from '@/request/http.js'; // 导入http中创建的axios实例

const user = {
  getList(params) {
    return axios.get(`/user`, {
      params: params
    })
  },
  rebackPassword(body) {
    return axios.put(`/user/password`, body)
  },
  newPassword(body) {
    return axios.put(`/user/newPassword`, body)
  },
  update(body){
    return axios.put(`/user`, body)
  },
  delete(body) {
    return axios.delete(`/user`, body)
  },
  lock(body) {
    return axios.put(`/user/lock`, body)
  },
  nonelock(body) {
    return axios.put(`/user/lock/none`, body)
  },
  addRoleToUser(body) {
    return axios.post(`/user/role`, body)
  },
  getRoleList(params) {
    return axios.get(`/user/role`, {
      params: params
    })
  }
}

export default user;
