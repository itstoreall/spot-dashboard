import TokenList from '../TokenList/TokenList';
import s from './Dashboard.module.scss';

const Dashboard = () => (
  <main className={s.dashboardBlock}>
    <TokenList />
  </main>
);

export default Dashboard;
