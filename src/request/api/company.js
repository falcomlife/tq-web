import axios from '@/request/http.js'; // 导入http中创建的axios实例

const company = {
    getList (params) {
        return axios.get(`/company`,{
          params: params
        });
    },
}

export default company;
