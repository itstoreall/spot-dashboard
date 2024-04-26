import axios, { AxiosRequestConfig } from 'axios';
import * as c from './config';
import * as t from './types';

axios.defaults.baseURL = c.baseURL;

export const getPrices = async () => {
  const config = { method: t.Method.GET, url: c.url };
  return makeRequest(config);
};

// --------- Make request:

export const makeRequest = async (config: t.RequestConfig) => {
  try {
    const axiosConfig: AxiosRequestConfig = { ...config };
    const response = await axios(axiosConfig);
    return response?.data;
  } catch (e) {
    return (e as Error).message;
  }
};
