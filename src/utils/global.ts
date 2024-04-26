import * as state from '../state';
import * as api from '../api';

export const getDate = () =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Kiev'
  }).format(new Date());

// ------ Update token prices:

const { btc, eth, ltc } = state.tokens;

export const updatePrices = async () => {
  console.log('price updated:', getDate());
  const prices = await api.getPrices();
  if (!prices || typeof prices === 'string') return;
  const { bitcoin, ethereum, litecoin } = prices;

  btc.value = bitcoin.usd;
  eth.value = ethereum.usd;
  ltc.value = litecoin.usd;
};
