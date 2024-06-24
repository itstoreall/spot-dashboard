import { useState } from 'react';
import { effect } from '@preact/signals-react';
import state from '../../state';
import * as gt from '../../types/global';
import * as ge from '../../enum/global';
import * as gc from '../../config/global';
import * as gu from '../../utils/global';
import * as vars from '../../styles/vars';
import RefetchIcon from '../../assets/icons/RefetchIcon';
import FetchingIcon from '../../assets/icons/FetchingIcon';
import TokenList from '../TokenList/TokenList';
import s from './Dashboard.module.scss';

const { time } = gc.date.format;
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
  const [updateDate, setUpdateDate] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  effect(() => status.value === ERROR && !isError && setIsError(true));

  effect(() => {
    const currnetDate = gu.getIntlDate(time.label);
    if (!isFetching && data.isUpdated && updateDate !== currnetDate)
      setUpdateDate(gu.getIntlDate(time.label));
  });

  const updateActions = () => {
    if (isFetching) return;
    setTimeout(() => setIsFetching(false), 15000);
    setIsFetching(true);
    refetchActions();
  };

  if (isError) return <ErrorBlock />;

  const refetchIconColor = data.isUpdated ? vars.colorGreen : vars.colorRed;

  return (
    <main className={s.dashboardBlock}>
      <div className={s.dashboard}>
        <time>{updateDate}</time>

        <div className={s.battonsBlock}>
          <button className={s.updateActionPrices} onClick={updateActions}>
            {isFetching ? (
              <FetchingIcon color={vars.colorWhite} />
            ) : (
              <RefetchIcon color={refetchIconColor} />
            )}
          </button>
        </div>
      </div>

      <TokenList data={data} />
    </main>
  );
};

export default Dashboard;
