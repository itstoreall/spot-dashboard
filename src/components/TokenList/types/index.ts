import * as gt from '../../../types/global';

export type TokenItemProps = {
  action: gt.Action;
  isSettings: boolean;
  setIsSettings: (b: boolean) => void;
  // settingsAction: gt.Action;
  setSettingsAction: (a: gt.Action | null) => void;
};
