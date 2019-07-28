import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  headers: {
    common: {
      'Content-Type': 'application/json'
    }
  }
};
export default axios.create(config);
