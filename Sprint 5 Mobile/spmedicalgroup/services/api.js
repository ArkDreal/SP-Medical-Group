import axios from 'axios';

const api = axios.create({
  baseURL: 'http://http://192.168.3.182:5000/api',
});

export default api;