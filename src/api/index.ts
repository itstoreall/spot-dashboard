import axios, { AxiosRequestConfig } from 'axios';
import * as ge from '../enum/global';
import * as c from './config';
import * as t from './types';

axios.defaults.baseURL = c.baseURL;

export const getPrices = async () => {
  const config = { method: t.Method.GET, url: c.url };
  return makeRequest(config);
};

export const getActions = async () => {
  return [
    {
      token: ge.Symbol.BTC,
      action: ge.Process.BUY,
      average_price: 20277.5,
      prices: [15555, 25000]
    },
    {
      token: ge.Symbol.ETH,
      action: ge.Process.SELL,
      average_price: 1500,
      prices: [1500]
    },
    {
      token: ge.Symbol.LTC,
      action: ge.Process.BUY,
      average_price: 75,
      prices: [65, 85]
    },
    {
      token: ge.Symbol.AVAX,
      action: ge.Process.BUY,
      average_price: 12.5,
      prices: [15, 10]
    },
    {
      token: ge.Symbol.SOL,
      action: ge.Process.SELL,
      average_price: 50,
      prices: [50]
    },
    {
      token: ge.Symbol.NEAR,
      action: ge.Process.BUY,
      average_price: 1.5,
      prices: [1, 2]
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
