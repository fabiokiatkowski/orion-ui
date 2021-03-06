import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.BASE_URL
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('orion.authToken');
  const newConfig = config;
  if (token) {
    newConfig.headers.common.Authorization = token;
  }
  return newConfig;
});

export default instance;
