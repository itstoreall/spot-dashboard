import * as ge from '../../../enum/global';
import state from '../../../state';

export const hanbleList = (symbol: ge.Symbol) => {
  return symbol === ge.Symbol.BTC
    ? state.tokens.btc
    : symbol === ge.Symbol.ETH
    ? state.tokens.eth
    : symbol === ge.Symbol.LTC
    ? state.tokens.ltc
    : symbol === ge.Symbol.AVAX
    ? state.tokens.avax
    : symbol === ge.Symbol.SOL
    ? state.tokens.sol
    : symbol === ge.Symbol.NEAR
    ? state.tokens.near
    : null;
};
