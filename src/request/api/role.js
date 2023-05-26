import axios from '@/request/http.js'; // 导入http中创建的axios实例

const role = {
    getList (params) {
        return axios.get(`/role`,{
          params: params
        });
    },
    save (body) {
        return axios.post(`/role`, body)
    },
    update (body) {
        return axios.put(`/role`, body)
    },
    delete(body){
      return axios.delete(`/role`, body)
    },
    addAuthorityToRole(body){
      return axios.post(`/role/authority`,body)
    }
}

export default role;
