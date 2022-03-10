import axios from 'axios'
import { ACCESS_TOKEN, SERVER_URL } from '../constants'

const API = axios.create({
    baseURL: SERVER_URL,
  })

const getToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
      return `Bearer ${token}`;
  } else {
      return null;
  }
};

API.interceptors.request.use(async config => {
  config.headers["content-type"] = "application/json; charset=utf-8";
  config.headers["X-Requested-With"] = "XMLHttpRequest";
  config.headers["Accept"] = "*/*";
  config.headers["Authorization"] = await getToken();
  return config;
});

export default API