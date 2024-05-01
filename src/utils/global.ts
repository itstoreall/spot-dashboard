import * as gc from '../config/global';
import * as gt from '../types/global';
import * as api from '../api';
import state from '../state';

const appEnv = process.env.REACT_APP_ENVIRONMENT;

const { btc, eth, ltc, avax, sol, near } = state.tokens;
const { date, time, dateAndTime } = gc.date.format;
const { production, develop } = gc.system.appEnv;

export const loger = <V>(v: V, e?: string) => console[!e ? 'log' : 'error'](v);

// ------ Status:

export const status = {
  [gt.Status.INIT]: {
    is: () => state.system.status.value === gt.Status.INIT,
    set: () => (state.system.status.value = gt.Status.INIT)
  },
  [gt.Status.PENDING]: {
    is: () => state.system.status.value === gt.Status.PENDING,
    set: () => (state.system.status.value = gt.Status.PENDING)
  },
  [gt.Status.ACTIVE]: {
    is: () => state.system.status.value === gt.Status.ACTIVE,
    set: () => (state.system.status.value = gt.Status.ACTIVE)
  },
  [gt.Status.ERROR]: {
    is: () => state.system.status.value === gt.Status.ERROR,
    set: () => (state.system.status.value = gt.Status.ERROR)
  }
};

// ------ Date and Time:

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

// ------ Data:

export const getInitData = async () => {
  const isPrices = await updatePrices();
  const isActions = await updateActions();
  isPrices && isActions && status.init.set();
};

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
      return true;
    // */

    default:
      loger(`ERROR in updatePrices, appEnv: ${appEnv}`);
      break;
  }
};

export const updateActions = async () => {
  const actions = await api.getActions();
  if (actions) {
    state.actions.value = await api.getActions();
    return true;
  } else return false;
};
