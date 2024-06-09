import { signal } from '@preact/signals-react';
import * as gt from '../types/global';

const system = {
  status: signal(''),
  update: signal('')
};

const actions = signal<gt.Action[] | null>(null);

const state = { system, actions };

export default state;
