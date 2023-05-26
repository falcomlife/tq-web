import axios from '@/request/http.js'; // 导入http中创建的axios实例

const authority = {
    getAll (params) {
        return axios.get(`/authority`,{
          params: params
        });
    },
    save (body) {
        return axios.post(`/authority`, body)
    },
    update (body) {
        return axios.put(`/authority`, body)
    },
    delete(body){
      return axios.delete(`/authority`, body)
    }  
}

export default authority;
