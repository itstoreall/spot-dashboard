import * as gc from '../config/global';
// import * as gt from '../types/global';
import * as state from '../state';
import * as api from '../api';

const appEnv = process.env.REACT_APP_ENVIRONMENT;

const { btc, eth, ltc } = state.tokens;
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

export const updatePrices = async () => {
  switch (appEnv) {
    case production:
      loger(`upd ${getIntlDate(time.label)} ${appEnv.slice(0, 4)}`);
      const prices = await api.getPrices();
      if (!prices || typeof prices === 'string') return;
      const { bitcoin, ethereum, litecoin } = prices;

      btc.value = bitcoin.usd;
      eth.value = ethereum.usd;
      ltc.value = litecoin.usd;
      break;

    case develop:
      loger(`upd ${getIntlDate(time.label)} ${appEnv.slice(0, 3)}`);
      break;

    default:
      loger(`ERROR in updatePrices, appEnv: ${appEnv}`);
      break;
  }
};
