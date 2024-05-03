import { signal } from '@preact/signals-react';
import * as gt from '../types/global';

const system = {
  status: signal(''),
  update: signal('')
};

const tokens = {
  btc: signal(0),
  eth: signal(0),
  ltc: signal(0),
  avax: signal(0),
  sol: signal(0),
  near: signal(0)
};

// const getInitActions = () => {};

const actions = signal<gt.ActionData[] | null>(null);

const state = { system, tokens, actions };

export default state;
