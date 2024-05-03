import state from '../../state';
import * as vars from '../../styles/vars';
// import * as gt from '../../types/global';
import * as gu from '../../utils/global';
import * as ge from '../../enum/global';
import * as cfg from './config';
import * as u from './utils';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import s from './TokenList.module.scss';

const { colorYellow: yellow, colorBlue: blue } = vars;
const { actions } = state;

const TokenItem = ({ symbol }: { symbol: ge.Symbol }) => {
  const currentPrice = u.hanbleList(symbol)?.value;
  const action = actions.value!.find(item => item.token === symbol);
  const actionName = action!.action;
  const target = action?.average_price;
  const priceChange = currentPrice! - target!;
  const percent = (priceChange! / target!) * 100;
  const settingsIconColor = gu.isBuy(actionName) ? yellow : blue;

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
      <li className={`${s.action} ${s[actionName!]}`}>
        <span>{target}</span>
      </li>
      <li className={s.percent}>
        <span>{percent.toFixed() || 0}</span>
      </li>
      <li className={s.settings}>
        <span onClick={() => console.log('click')}>
          <SettingsIcon color={settingsIconColor} />
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
