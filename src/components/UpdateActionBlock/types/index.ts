import { ChangeEventHandler, FormEventHandler } from 'react';
import * as ge from '../../../enum/global';
import * as gt from '../../../types/global';

// export type ActionInput = {
//   tokenId: number;
//   token: string;
//   action: string;
//   average_price: number;
//   current_price: number;
//   prices: number[];
//   percent: number;
//   status: string;
// };

export type Process = { title: ge.Process; value: ge.Process };
export type Status = { title: ge.ProcessStatus; value: ge.ProcessStatus };

export type SelectOptions = {
  actions: Process[];
  status: Status[];
};

export type UpdateActionBlockProps = {
  setIsSettings: (b: boolean) => void;
  settingsAction: gt.Action;
};

export type UpdateActionFormProps = {
  // spotAction: gt.Action;
  selectOptions: SelectOptions;
  actionOpt: Process;
  setActionOpt: (a: Process) => void;
  actionPrices: number[];
  handlePrices: (label: 'add' | 'del', newPrice: number) => void;
  statusOpt: Status;
  setStatusOpt: (s: Status) => void;
  handleSubmit: () => void;
  // handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
};
