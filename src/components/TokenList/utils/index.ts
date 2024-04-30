import * as gt from '../../../types/global';
import * as state from '../../../state';

export const hanbleList = (symbol: gt.Symbol) => {
  return symbol === gt.Symbol.BTC
    ? state.tokens.btc
    : symbol === gt.Symbol.ETH
    ? state.tokens.eth
    : symbol === gt.Symbol.LTC
    ? state.tokens.ltc
    : symbol === gt.Symbol.AVAX
    ? state.tokens.avax
    : symbol === gt.Symbol.SOL
    ? state.tokens.sol
    : symbol === gt.Symbol.NEAR
    ? state.tokens.near
    : null;
};
