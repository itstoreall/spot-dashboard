import axios, { AxiosRequestConfig } from 'axios';
import * as gt from '../types/global';
import * as c from './config';
import * as t from './types';

axios.defaults.baseURL = c.baseURL;

export const getPrices = async () => {
  const config = { method: t.Method.GET, url: c.url };
  return makeRequest(config);
};

// export const getAveragePrice = (actions: { [key: string]: number }[]) => {
//   const sum = actions.reduce((acc, curr) => acc + curr.buy, 0);
//   const average = sum / actions.length;
//   console.log('average', average);
//   return average;
// };

// getAveragePrice([{ buy: 15555 }, { buy: 25000 }]);

export const getActions = async () => {
  // const config = { method: t.Method.GET, url: c.url };
  return [
    {
      token: gt.Symbol.BTC,
      average_price: 20277.5,
      actions: [{ [gt.Process.BUY]: 15555 }, { [gt.Process.BUY]: 25000 }]
    },
    {
      token: gt.Symbol.ETH,
      average_price: 1500,
      actions: [{ [gt.Process.SELL]: 1500 }]
    },
    {
      token: gt.Symbol.LTC,
      average_price: 75,
      actions: [{ [gt.Process.BUY]: 65 }, { [gt.Process.BUY]: 85 }]
    },
    {
      token: gt.Symbol.AVAX,
      average_price: 12.5,
      actions: [{ [gt.Process.BUY]: 15 }, { [gt.Process.BUY]: 10 }]
    },
    {
      token: gt.Symbol.SOL,
      average_price: 50,
      actions: [{ [gt.Process.SELL]: 50 }]
    },
    {
      token: gt.Symbol.NEAR,
      average_price: 1.5,
      actions: [{ [gt.Process.BUY]: 1 }, { [gt.Process.BUY]: 2 }]
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
