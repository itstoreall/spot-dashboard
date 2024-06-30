import * as ge from '../../../enum/global';
import * as gt from '../../../types/global';

export type Process = { title: ge.Process; value: ge.Process };
export type Status = { title: ge.ProcessStatus; value: ge.ProcessStatus };

export type SelectOptions = {
  actions: Process[];
  status: Status[];
};

export type UpdateActionBlockProps = {
  settingsAction: gt.Action;
  handleIsSettings: (b: boolean) => void;
};

export type UpdateActionFormProps = {
  selectOptions: SelectOptions;
  actionOpt: Process;
  setActionOpt: (a: Process) => void;
  actionPrices: number[];
  handlePrices: (label: 'add' | 'del', newPrice: number) => void;
  statusOpt: Status;
  setStatusOpt: (s: Status) => void;
  handleSubmit: () => void;
};
