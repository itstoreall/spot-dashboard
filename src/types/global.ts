export enum Token {
  BITCOIN = 'bitcoin',
  ETHEREUM = 'ethereum',
  LITECOIN = 'litecoin',
  AVALANCHE = 'avalanche',
  SOLANA = 'solana',
  NEAR = 'near'
}

export enum Symbol {
  BTC = 'btc',
  ETH = 'eth',
  LTC = 'ltc',
  AVAX = 'avax',
  SOL = 'sol',
  NEAR = 'near'
}

export enum Status {
  INIT = 'init',
  PENDING = 'pending',
  ACTIVE = 'active',
  ERROR = 'error'
}

export enum Process {
  BUY = 'buy',
  SELL = 'sell'
}

export type IntelDateTimeFormat = Intl.DateTimeFormatOptions;

export type Action = { [key in Process]: number };

export type ActionData = {
  token: Symbol;
  average_price: number;
  actions: Action[];
};
