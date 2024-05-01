import { useEffect } from 'react';
// import * as state from './state'
// import * as gt from './types/global';
import * as gu from './utils/global';
import Dashboard from './components/Dashboard';

const delay = Number(process.env.REACT_APP_UPDATE_DELAY || 600000);

const App = () => {
  useEffect(() => {
    gu.getInitData();
    const int = setInterval(() => gu.updatePrices(), delay);
    return () => {
      clearInterval(int);
    };
  }, []);

  return <Dashboard />;
};

export default App;
