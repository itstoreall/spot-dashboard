import { useState } from 'react';
import * as vars from '../../styles/vars';
import * as gu from '../../utils/global';
import * as gt from '../../types/global';
import * as t from './types';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import UpdateActionBlock from '../UpdateActionBlock';
import s from './TokenList.module.scss';

const { colorYellow, colorBlue, colorGrey } = vars;

const TokenItem = ({
  action,
  isSettings,
  setIsSettings,
  setSettingsAction
}: t.TokenItemProps) => {
  // const [isSettings, setIsSettings] = useState(false);

  // console.log('isSettings', isSettings);

  // const target = action?.average_price;
  // const priceChange = currentPrice! - target!;
  // const percent = (priceChange! / target!) * 100;

  const handleSettings = () => {
    setIsSettings(!isSettings);
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

  // console.log('isSettings', isSettings);

  return (
    <>
      {isSettings && settingsAction && (
        <div className={s.formBlock}>
          <UpdateActionBlock {...{ setIsSettings, settingsAction }} />
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
                    setIsSettings,
                    // settingsAction,
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
