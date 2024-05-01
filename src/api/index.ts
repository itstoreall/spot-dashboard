import axios, { AxiosRequestConfig } from 'axios';
import * as gt from '../types/global';
import * as c from './config';
import * as t from './types';

axios.defaults.baseURL = c.baseURL;

export const getPrices = async () => {
  const config = { method: t.Method.GET, url: c.url };
  return makeRequest(config);
};

export const getActions = async () => {
  // const config = { method: t.Method.GET, url: c.url };
  return [
    {
      token: gt.Symbol.BTC,
      action: [{ buy: 55000 }]
    },
    {
      token: gt.Symbol.ETH,
      action: [{ sell: 12000 }]
    },
    {
      token: gt.Symbol.LTC,
      action: [{ buy: 65 }]
    },
    {
      token: gt.Symbol.AVAX,
      action: [{ buy: 15 }]
    },
    {
      token: gt.Symbol.SOL,
      action: [{ sell: 225 }]
    },
    {
      token: gt.Symbol.NEAR,
      action: [{ buy: 50 }]
    }
  ];
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
