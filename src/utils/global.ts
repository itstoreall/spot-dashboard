import * as gc from '../config/global';
import * as ge from '../enum/global';
import state from '../state';

const { INIT, PENDING, ACTIVE, ERROR } = ge.AppStatus;
const { date, time, dateAndTime } = gc.date.format;

export const loger = <V>(v: V, e?: string) => console[!e ? 'log' : 'error'](v);

// ------ Process (Action):

export const isBuy = (action: ge.Process) => action === ge.Process.BUY;
export const isSell = (action: ge.Process) => action === ge.Process.SELL;
export const isInit = (action: ge.Process) => action === ge.Process.INIT;

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
