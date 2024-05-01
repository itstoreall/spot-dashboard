import state from '../../state';
import * as vars from '../../styles/vars';
import * as gt from '../../types/global';
import * as cfg from './config';
import * as u from './utils';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import s from './TokenList.module.scss';

const { colorYellow: yellow, colorBlue: blue } = vars;
const { actions } = state;

const TokenItem = ({ symbol }: { symbol: gt.Symbol }) => {
  const action = actions.value!.find(item => item.token === symbol)?.action[0];
  const entries = action ? Object.entries(action) : [['error', 0]];
  const actionName = entries[0][0];
  const actionPrice = entries[0][1];
  const currentPrice = u.hanbleList(symbol)?.value;
  const priceChange = currentPrice && currentPrice - (actionPrice as number);
  const percent = (priceChange! / (actionPrice as number)) * 100;
  const SettingsIconColor = actionName === gt.Process.BUY ? yellow : blue;

  // console.log('percent', typeof Number(percent.toFixed()) === 'number');
  // console.log('Process', gt.Process, actionName);

  return (
    <ul className={s.itemRowList}>
      <li className={s.symbol}>
        <span>{`${symbol}`}</span>
      </li>
      <li className={s.price}>
        <span>
          <>{u.hanbleList(symbol)}</>
        </span>
      </li>
      <li className={`${s.action} ${s[actionName]}`}>
        <span>{actionPrice}</span>
      </li>
      <li className={s.percent}>
        <span>{percent.toFixed() || 0}</span>
      </li>
      <li className={s.settings}>
        <span onClick={() => console.log('click')}>
          <SettingsIcon color={SettingsIconColor} />
        </span>
      </li>
    </ul>
  );
};

const TokenList = () => (
  <div className={s.tokenListBlock}>
    <ul className={s.tokenList}>
      {cfg.tokens.map(token => {
        return (
          <li key={token.symbol} className={s.tokenItem}>
            <TokenItem symbol={token.symbol} />
          </li>
        );
      })}
    </ul>
  </div>
);

export default TokenList;
