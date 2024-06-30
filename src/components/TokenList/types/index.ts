import * as gt from '../../../types/global';

export type TokenItemProps = {
  action: gt.Action;
  isSettings: boolean;
  handleIsSettings: (b: boolean) => void;
  setSettingsAction: (a: gt.Action | null) => void;
};
