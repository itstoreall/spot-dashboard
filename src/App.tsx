import { useEffect } from 'react';
import * as gu from './utils/global';
import Dashboard from './components/Dashboard';

const delay = Number(process.env.REACT_APP_UPDATE_DELAY || 600000);

const App = () => {
  useEffect(() => {
    gu.updatePrices();
    const int = setInterval(() => gu.updatePrices(), delay);
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
