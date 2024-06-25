import { useState } from 'react';
import s from './Guard.module.scss';

const admin = process.env.REACT_APP_ADMIN_KEY;

const KeyHandler = ({ setKey }: any) => {
  return (
    <section className={s.guard}>
      <div className={s.content}>
        <input
          type='tel'
          // placeholder={'Key'}
          onChange={e => setKey(e.target.value)}
          maxLength={12}
        />
      </div>
    </section>
  );
};

const Guard = ({ children }: any) => {
  const [key, setKey] = useState(null);
  if (admin !== key) return <KeyHandler {...{ setKey }} />;
  return children;
};

export default Guard;
