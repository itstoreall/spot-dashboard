import { useState } from 'react';
import { effect } from '@preact/signals-react';
import state from '../../state';
// import * as gu from '../../utils/global';
import Loader from '../Loader';
import TokenList from '../TokenList/TokenList';
// import Controls from '../Controls';
import s from './Dashboard.module.scss';

const { status } = state.system;

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  effect(() =>
    setTimeout(() => isLoading && status.value && setIsLoading(false), 2000)
  );

  return (
    <div className={s.dashboardBlock}>
      {isLoading ? <Loader /> : <TokenList />}
    </div>
  );
};

export default Dashboard;

// <Controls />
