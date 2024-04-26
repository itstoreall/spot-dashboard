import * as state from '../state';
import * as api from '../api';

const { btc, eth, ltc } = state.tokens;

export const updatePrices = async () => {
  const prices = await api.getPrices();

  if (!prices || typeof prices === 'string') return;

  const { bitcoin, ethereum, litecoin } = prices;

  btc.value = bitcoin.usd;
  eth.value = ethereum.usd;
  ltc.value = litecoin.usd;
};
