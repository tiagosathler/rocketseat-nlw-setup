import axios from 'axios';

const host = import.meta.env.VITE_SERVER_ADDRESS as string;

const api = axios.create({
  baseURL: `http://${host}:3333`,
});

export default api;
