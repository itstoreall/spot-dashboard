import { useState } from 'react';
import s from './Guard.module.scss';

type KeyHandlerProps = {
  userKey: string | null;
  setUserKey: (v: string) => void;
};

const admin = process.env.REACT_APP_ADMIN_KEY;

const KeyHandler = ({ userKey, setUserKey }: KeyHandlerProps) => {
  return (
    <section className={s.guard}>
      <div className={s.content}>
        <div className={s.displayKey}>
          <span className={s.userKey}>{userKey}</span>
        </div>

        <input
          type='tel'
          onChange={e => setUserKey(e.target.value)}
          maxLength={8}
        />
      </div>
    </section>
  );
};

const Guard = ({ children }: any) => {
  const [userKey, setUserKey] = useState<string | null>(null);
  if (admin !== userKey) return <KeyHandler {...{ userKey, setUserKey }} />;
  return children;
};

export default Guard;
