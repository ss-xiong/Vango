// Axios 配置后的实例
import { axiosInstance } from './httpInstance/axiosInstance';

// 使用示例
export const requestUserInfoAPI = (
  userId: string,
) => axiosInstance.post(
  '/userInfo', // 请求路径
  { userId }, // 请求参数
  // 单独的头部定义
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
);
