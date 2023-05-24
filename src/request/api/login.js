import axios from '@/request/http.js'; // 导入http中创建的axios实例

const login = {
    login (body) {
        return axios.post(`/login`,body)
    }
}

export default login;
