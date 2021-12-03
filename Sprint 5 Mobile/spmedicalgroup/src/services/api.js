import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.6.82',
});

export default api;