import axios from 'axios';

const host = '192.168.5.158';

const api = axios.create({
  baseURL: `http://${host}:3333`,
});

export default api;
