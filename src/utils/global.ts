import * as gc from '../config/global';
// import * as gt from '../types/global';
import * as ge from '../enum/global';
import * as api from '../api';
import state from '../state';

const appEnv = process.env.REACT_APP_ENVIRONMENT;

const { btc, eth, ltc, avax, sol, near } = state.tokens;
const { INIT, PENDING, ACTIVE, ERROR } = ge.Status;
const { date, time, dateAndTime } = gc.date.format;
const { production, develop } = gc.system.appEnv;
const { update } = state.system;

export const loger = <V>(v: V, e?: string) => console[!e ? 'log' : 'error'](v);

// ------ Process (Action):

export const isBuy = (action: ge.Process) => action === ge.Process.BUY;
export const isSell = (action: ge.Process) => action === ge.Process.SELL;

// ------ Status:

export const status = {
  [INIT]: {
    is: () => state.system.status.value === INIT,
    set: () => (state.system.status.value = INIT)
  },
  [PENDING]: {
    is: () => state.system.status.value === PENDING,
    set: () => (state.system.status.value = PENDING)
  },
  [ACTIVE]: {
    is: () => state.system.status.value === ACTIVE,
    set: () => (state.system.status.value = ACTIVE)
  },
  [ERROR]: {
    is: () => state.system.status.value === ERROR,
    set: () => (state.system.status.value = ERROR)
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

const fetchPricesProd = async () => {
  try {
    const prices = await api.getPrices();
    if (!prices || typeof prices === 'string') return status.error.set();
    btc.value = prices.bitcoin.usd;
    eth.value = prices.ethereum.usd;
    ltc.value = prices.litecoin.usd;
    avax.value = prices['avalanche-2'].usd;
    sol.value = prices.solana.usd;
    near.value = prices.near.usd;
  } catch (e) {
    console.error('ERROR in fetchPrices:', e);
    status.error.set();
  }
};

const fetchPricesDev = async () => {
  btc.value = 60000.08;
  eth.value = 3000.08;
  ltc.value = 80.08;
  avax.value = 40.08;
  sol.value = 130.08;
  near.value = 5.08;
};

export const updatePrices = async () => {
  const updTime = getIntlDate(time.label);

  switch (appEnv) {
    // case develop:
    case production:
      await fetchPricesProd();
      loger(`upd ${updTime} ${appEnv.slice(0, 4)}`);
      update.value = updTime;
      return true;

    // /*
    case develop:
      await fetchPricesDev();
      loger(`upd ${updTime} ${appEnv.slice(0, 3)}`);
      update.value = updTime;
      return true;
    // */

    default:
      loger(`ERROR in updatePrices, appEnv: ${appEnv}`);
      break;
  }
};

export const updateActions = async () => {
  try {
    state.actions.value = await api.getActions();
    // state.actions.value = (await api.getActions()) as gt.ActionData[];
    return true;
  } catch (e) {
    console.error('ERROR in updateActions:', e);
    status.error.set();
    return false;
  }
};

/*
[
  {
    token: gt.Symbol.BTC,
    average_price: 0,
    actions: []
  },
  {
    token: gt.Symbol.ETH,
    average_price: 0,
    actions: []
  },
  {
    token: gt.Symbol.LTC,
    average_price: 0,
    actions: []
  },
  {
    token: gt.Symbol.AVAX,
    average_price: 0,
    actions: []
  },
  {
    token: gt.Symbol.SOL,
    average_price: 0,
    actions: []
  },
  {
    token: gt.Symbol.NEAR,
    average_price: 0,
    actions: []
  }
];
*/
