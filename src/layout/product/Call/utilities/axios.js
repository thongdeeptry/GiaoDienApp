/** @format */

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
  baseURL: 'https://genzlovetokenlive.onrender.com/rtc/',
});

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    config.headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return config;
  },
  err => Promise.reject(err),
);
axiosInstance.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err),
);
export default axiosInstance;
