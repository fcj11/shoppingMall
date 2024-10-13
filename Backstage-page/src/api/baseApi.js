import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5173', // 设置基础 URL
  timeout: 5000, // 设置请求超时时间
});

// 设置请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加 token
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 设置响应拦截器
instance.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 对响应错误做点什么
    if (error.response.status === 401) {
      // 例如，可以跳转到登录页面
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 定义 GET 请求方法
// instance.get = (url, params, options) => {
//   return instance.get(url, { params }, options);
// };

// // 定义 POST 请求方法
// instance.post = (url, data, options) => {
//   return instance.post(url, data, options);
// };


export default instance;

