import axios from 'axios';
import Constants from 'expo-constants';

const host = (Constants.expoConfig?.extra?.apiUrl || '0.0.0.0') as string;
console.log(`Requesting Server API on host address: ${host}`);

const api = axios.create({
  baseURL: `http://${host}:3333`,
});

export default api;
