import Controls from '../Controls';
import TokenList from '../TokenList/TokenList';
import s from './Dashboard.module.scss';

const Dashboard = () => {
  return (
    <div className={s.dashboardBlock}>
      <TokenList />
      <Controls />
    </div>
  );
};

export default Dashboard;
