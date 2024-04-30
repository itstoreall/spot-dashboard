import * as gc from '../config/global';
// import * as gt from '../types/global';
import * as state from '../state';
import * as api from '../api';

const appEnv = process.env.REACT_APP_ENVIRONMENT;

const { btc, eth, ltc, avax, sol, near } = state.tokens;
const { production, develop } = gc.system.appEnv;
const { date, time, dateAndTime } = gc.date.format;

export const loger = <V>(v: V, e?: string) => console[!e ? 'log' : 'error'](v);

// ------ Date:

const setIntDateFormat = (format?: string) => {
  switch (format) {
    case date.label:
      return date.value;

    case time.label:
      return time.value;

    default:
      return dateAndTime.value;
  }
};

export const getIntlDate = (format?: string) =>
  new Intl.DateTimeFormat('en-GB', setIntDateFormat(format)).format(new Date());

// ------ Prices:

const fetchPrices = async (appEnv: string) => {
  loger(`upd ${getIntlDate(time.label)} ${appEnv.slice(0, 4)}`);
  const prices = await api.getPrices();
  // console.log(prices);
  if (!prices || typeof prices === 'string') return;

  btc.value = prices.bitcoin.usd;
  eth.value = prices.ethereum.usd;
  ltc.value = prices.litecoin.usd;
  avax.value = prices['avalanche-2'].usd;
  sol.value = prices.solana.usd;
  near.value = prices.near.usd;
};

export const updatePrices = async () => {
  switch (appEnv) {
    // case develop:
    case production:
      await fetchPrices(appEnv);
      break;

    // /*
    case develop:
      loger(`upd ${getIntlDate(time.label)} ${appEnv.slice(0, 3)}`);

      btc.value = 60893.08;
      eth.value = 2995.08;
      ltc.value = 78.08;
      avax.value = 32.08;
      sol.value = 125.08;
      near.value = 6.08;
      break;
    // */

    default:
      loger(`ERROR in updatePrices, appEnv: ${appEnv}`);
      break;
  }
};
