import * as ge from '../enum/global';

export type IntelDateTimeFormat = Intl.DateTimeFormatOptions;

// export type Action = { [key in ge.Process]: number };

export type ActionData = {
  token: ge.Symbol;
  action: ge.Process;
  average_price: number;
  prices: number[];
};
