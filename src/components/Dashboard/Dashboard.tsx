import { useState } from 'react';
import { effect } from '@preact/signals-react';
import state from '../../state';
import { Status } from '../../enum/global';
import TokenList from '../TokenList/TokenList';
import s from './Dashboard.module.scss';

const { status } = state.system;

const ErrorBlock = () => (
  <div className={s.errorBackdrop}>
    <p>Oops, something went wrong!</p>
    <button className={s.reloadButton} onClick={() => window.location.reload()}>
      Reload
    </button>
  </div>
);

const Dashboard = () => {
  const [isError, setIsError] = useState(false);

  effect(() => status.value === Status.ERROR && !isError && setIsError(true));

  if (isError) return <ErrorBlock />;

  return (
    <main className={s.dashboardBlock}>
      <TokenList />
    </main>
  );
};

export default Dashboard;
