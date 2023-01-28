import axios from 'axios';
import Constants from 'expo-constants';

const baseURL = (Constants.expoConfig?.extra?.apiUrl || 'localhost') as string;
console.log(`Requesting Server API on host address: ${baseURL}`);

const api = axios.create({
  baseURL,
});

export default api;
