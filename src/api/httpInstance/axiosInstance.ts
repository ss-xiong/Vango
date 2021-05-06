import axios from 'axios';
import queryString from 'qs';
import { requestConfig } from '../../../appConfig';

const { api: apiConfig } = requestConfig;

// 1. Axios 实例
const axiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
});

// 2. 添加请求劫持器
axiosInstance.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const { method = '', data, headers = {} } = newConfig;

  // POST请求, data 对象处理为 querystring
  if (
    (data !== null && data instanceof Object)
    && method.toUpperCase() === 'POST'
    && headers['Content-Type'] === 'application/x-www-form-urlencoded'
  ) {
    newConfig.data = queryString.stringify(data, { arrayFormat: 'repeat' });
  }

  // 添加 自定义Header处理
  const newHeaders = {
    // headerName: 'headerValue',
  };

  Object.keys(newHeaders).forEach((key) => {
    newConfig.headers[key] = (newHeaders as any)[key];
  });

  return newConfig;
});

// 3. 添加响应劫持器
axiosInstance.interceptors.response.use(
  // eslint-disable-next-line arrow-body-style
  (res) => {
    return res.data;
  },
  // eslint-disable-next-line arrow-body-style
  (err) => {
    return Promise.reject(err);
  },
);

export {
  axiosInstance,
};
