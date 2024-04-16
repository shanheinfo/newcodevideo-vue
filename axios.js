import axios from 'axios';
// 创建 Axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:9099', // 后端地址和端口号
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 在请求发送之前做些什么
        // 例如添加 token 到 headers
        // config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 对响应数据做些什么
        return response;
    },
    (error) => {
        // 对响应错误做些什么
        return Promise.reject(error);
    }
);

export default instance;
