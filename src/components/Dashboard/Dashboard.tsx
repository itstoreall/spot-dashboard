import { useState } from 'react';
import { effect } from '@preact/signals-react';
import state from '../../state';
import * as gt from '../../types/global';
import * as ge from '../../enum/global';
import UpdateIcon from '../../assets/icons/UpdateIcon';
import TokenList from '../TokenList/TokenList';
import s from './Dashboard.module.scss';

const { status } = state.system;
const { ERROR } = ge.AppStatus;

const ErrorBlock = () => (
  <div className={s.errorBackdrop}>
    <p>Oops, something went wrong!</p>
    <button className={s.reloadButton} onClick={() => window.location.reload()}>
      Reload
    </button>
  </div>
);

const Dashboard = ({ data, refetchActions }: gt.DashboardProps) => {
  const [isError, setIsError] = useState(false);

  effect(() => status.value === ERROR && !isError && setIsError(true));

  const updateActions = () => {
    refetchActions();
    // console.log('* updateActions', data.isUpdated);
  };

  if (isError) return <ErrorBlock />;

  return (
    <main className={s.dashboardBlock}>
      <div className={s.dashboard}>
        <div className={s.battonsBlock}>
          <button className={s.updateActionPrices} onClick={updateActions}>
            <UpdateIcon />
          </button>
        </div>
      </div>

      <TokenList data={data} />
    </main>
  );
};

export default Dashboard;
