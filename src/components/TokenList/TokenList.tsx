import { useState } from 'react';
import * as vars from '../../styles/vars';
import * as gu from '../../utils/global';
import * as gt from '../../types/global';
import * as t from './types';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import Settings from '../Settings';
import s from './TokenList.module.scss';

const { colorYellow, colorBlue, colorGrey } = vars;

const TokenItem = (props: t.TokenItemProps) => {
  const { action, isSettings, handleIsSettings, setSettingsAction } = props;

  const handleSettings = () => {
    handleIsSettings(!isSettings);
    setSettingsAction(!isSettings ? action : null);
  };

  const settingsIconColor = gu.isBuy(action.action)
    ? colorYellow
    : gu.isSell(action.action)
    ? colorBlue
    : colorGrey;

  return (
    <ul className={s.itemRowList}>
      <li className={s.symbol}>
        <span>{`${action.token}`}</span>
      </li>
      <li className={s.price}>
        <span>{action.current_price}</span>
      </li>
      <li className={`${s.action} ${s[action.action]}`}>
        <span>{action.average_price}</span>
      </li>
      <li className={s.percent}>
        <span>{action.percent.toFixed() || 0}</span>
      </li>
      <li className={s.settings} onClick={handleSettings}>
        <span onClick={() => console.log('click')}>
          <SettingsIcon color={settingsIconColor} />
        </span>
      </li>
    </ul>
  );
};

const TokenList = ({ data }: gt.TokenListProps) => {
  const [isSettings, setIsSettings] = useState(false);
  const [settingsAction, setSettingsAction] = useState<gt.Action | null>(null);

  const handleIsSettings = (b: boolean) => setIsSettings(b);

  return (
    <>
      {isSettings && settingsAction && (
        <div className={s.formBlock}>
          <Settings {...{ settingsAction, handleIsSettings }} />
        </div>
      )}

      <div className={s.tokenListBlock}>
        <ul className={s.tokenList}>
          {data.actions.map((action: gt.Action) => {
            return (
              <li key={action.token} className={s.tokenItem}>
                <TokenItem
                  {...{
                    action,
                    isSettings,
                    handleIsSettings,
                    setSettingsAction
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default TokenList;
