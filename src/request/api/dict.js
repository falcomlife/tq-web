import axios from '@/request/http.js'; // 导入http中创建的axios实例

const dict = {
    getDict (params) {
        return axios.get(`/dict/items`,{
          params: params
        });
    },
    save(body){
      return axios.post(`/dict/item`, body)
    }
}

export default dict;
