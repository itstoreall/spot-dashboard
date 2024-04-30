import * as gt from '../../types/global';
import * as cfg from './config';
import * as u from './utils';
import s from './TokenList.module.scss';

const TokenItem = ({ symbol }: { symbol: gt.Symbol }) => (
  <ul className={s.itemRowList}>
    <li className={s.symbol}>
      <span>{`${symbol}`}</span>
    </li>
    <li className={s.price}>
      <span>
        <>{u.hanbleList(symbol)}</>
      </span>
    </li>
    <li className={s.buy}>
      <span>
        <>{u.hanbleList(symbol)}</>
      </span>
    </li>
    <li className={s.sell}>
      <span>
        <>{u.hanbleList(symbol)}</>
      </span>
    </li>
    <li className={s.settings}>
      <span>B</span>
    </li>
  </ul>
);

const TokenList = () => (
  <div className={s.tokenListBlock}>
    <ul className={s.tokenList}>
      {cfg.tokens.map(token => (
        <li key={token.symbol} className={s.tokenItem}>
          <TokenItem symbol={token.symbol} />
        </li>
      ))}
    </ul>
  </div>
);

export default TokenList;
