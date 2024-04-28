import * as gc from '../config/global';
import * as state from '../state';
import * as api from '../api';

const appEnv = process.env.REACT_APP_ENVIRONMENT;

const { date, time, dateAndTime } = gc.date.format;

export const logApp = <V>(v: V, e?: string) => console[!e ? 'log' : 'error'](v);

const setIntDateFormat = (format?: string) => {
  switch (format) {
    case date.label:
      return date.value as Intl.DateTimeFormatOptions;

    case time.label:
      return time.value as Intl.DateTimeFormatOptions;

    default:
      return dateAndTime.value as Intl.DateTimeFormatOptions;
  }
};

export const getIntlDate = (format?: string) =>
  new Intl.DateTimeFormat('en-GB', setIntDateFormat(format)).format(new Date());

// ------ Update token prices:

const { btc, eth, ltc } = state.tokens;
const { production, develop } = gc.system.appEnv;

export const updatePrices = async () => {
  switch (appEnv) {
    case production:
      logApp(`upd (${appEnv}) ${getIntlDate(time.label)}`);
      const prices = await api.getPrices();
      if (!prices || typeof prices === 'string') return;
      const { bitcoin, ethereum, litecoin } = prices;

      btc.value = bitcoin.usd;
      eth.value = ethereum.usd;
      ltc.value = litecoin.usd;
      break;

    case develop:
      logApp(`upd (${appEnv}) ${getIntlDate(time.label)}`);
      break;

    default:
      logApp(`ERROR in updatePrices, appEnv: ${appEnv}`);
      break;
  }
};
