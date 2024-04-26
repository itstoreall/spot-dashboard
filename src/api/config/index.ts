const priceUrl = 'simple/price';
const tokens = `ids=bitcoin,litecoin,ethereum`;
const usd = 'vs_currencies=usd';

export const baseURL = 'https://api.coingecko.com/api/v3/';

export const url = `${priceUrl}?${tokens}&${usd}`;
