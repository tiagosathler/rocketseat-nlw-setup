import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.5.158:3333',
});

export default api;
