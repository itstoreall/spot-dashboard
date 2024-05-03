import state from '../../state';
import * as vars from '../../styles/vars';
import * as gt from '../../types/global';
import * as gu from '../../utils/global';
import * as cfg from './config';
import * as u from './utils';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import s from './TokenList.module.scss';

const { colorYellow: yellow, colorBlue: blue } = vars;
// const { actions } = state;

const TokenItem = ({ symbol }: { symbol: gt.Symbol }) => {
  // ---

  const price = u.hanbleList(symbol)?.value;

  console.log('price', price);
  // console.log('actions', actions.value);

  // if (!price || !actions.value) return gu.status.error.set();

  // console.log('gu.status.error', gu.status.error.is());
  // console.log('u.hanbleList(symbol)', u.hanbleList(symbol)?.value);

  // if (!actions.value)
  // ---

  // const action = actions.value!.find(item => item.token === symbol)?.actions[0];
  // const action = actions.value!.find(item => item.token === symbol);

  /*
  const entries = action ? Object.entries(action) : [['error', 0]];

  console.log('action', action?.actions.length);
  // const actionName = entries[2][1]; //
  const actionName = action?.actions.length
    ? Object.keys(action.actions[0])[0]
    : '';

  const actionPrice = entries[1][1]; // average_price
  const currentPrice = u.hanbleList(symbol)?.value;
  const priceChange = currentPrice && currentPrice - (actionPrice as number);
  const percent = (priceChange! / (actionPrice as number)) * 100;
  const SettingsIconColor = actionName === gt.Process.BUY ? yellow : blue;
  */

  // const getAveragePrice = (actions: { [key: string]: number }[]) => {
  //   // if (Object.keys(buys[0])[0] === gt.Process.SELL) return
  //   // console.log('actions', Object.keys(actions[0])[0]);
  //   // u.hanbleList(symbol);
  //   const action = Object.keys(actions[0])[0];
  //   const sum = actions.reduce(
  //     (acc, curr) => acc + curr[action as gt.Process],
  //     0
  //   );
  //   const average = sum / actions.length;
  //   console.log('average', average);
  //   return average;
  // };

  // console.log('action', action);
  // console.log('entries', entries);
  // console.log('Object -->', Object.keys(action!.actions[0])[0]);
  // console.log('Object -->', action!.actions[0]);
  // console.log('actionName', actionName);
  // console.log('actionPrice', actionPrice);

  // getAveragePrice([{ buy: 15555 }, { buy: 25000 }]);

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
      {/* <li className={`${s.action} ${s[actionName]}`}> */}
      <li className={`${s.action} ${s['']}`}>
        <span>{0 as number}</span>
        {/* <span>{actionPrice as number}</span> */}
      </li>
      <li className={s.percent}>
        <span>{3 || 0}</span>
        {/* <span>{percent.toFixed() || 0}</span> */}
      </li>
      <li className={s.settings}>
        <span onClick={() => console.log('click')}>
          {/* <SettingsIcon color={SettingsIconColor} /> */}
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
