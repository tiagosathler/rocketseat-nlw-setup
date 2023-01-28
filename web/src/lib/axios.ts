import axios from 'axios';

const baseURL = import.meta.env.VITE_SERVER_ADDRESS as string;

const api = axios.create({
  baseURL,
});

export default api;
