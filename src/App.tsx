import { useEffect } from 'react';
import * as gu from './utils/global';
import Dashboard from './components/Dashboard';

const delay = process.env.REACT_APP_UPDATE_DELAY;

const App = () => {
  useEffect(() => {
    gu.updatePrices();
    const int = setInterval(() => gu.updatePrices(), Number(delay) || 600000);
    return () => {
      clearInterval(int);
    };
  }, []);

  return (
    <div className='App'>
      <Dashboard />
    </div>
  );
};

export default App;
