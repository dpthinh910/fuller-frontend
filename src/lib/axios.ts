import { notification } from 'antd';
import Axios, { AxiosRequestConfig } from 'axios';

import { API_URL } from 'src/config';
import { storage } from 'src/utils/localStorage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (!!token) {
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    const message = error.response?.data || error.message;
    notification.error({
      message: message.error || 'Internal Server Error',
      description: message.message,
    });
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
  if (err.response.status === 401 || err.response.data.message === '401 Unauthorized') {
    window.alert('Please log in again');
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
  }
});
