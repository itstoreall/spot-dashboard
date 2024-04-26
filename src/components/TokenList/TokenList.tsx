import * as cfg from './config';
import * as u from './utils';
import s from './TokenList.module.scss';

const TokenList = () => (
  <ul className={s.tokenList}>
    {cfg.tokens.map(token => (
      <li key={token.symbol} className={s.tokenItem}>
        <span className={s.symbol}>{`${token.symbol}: `}</span>
        <span className={s.price}>
          <>{u.hanbleList(token.symbol)}</>
        </span>
      </li>
    ))}
  </ul>
);

export default TokenList;
