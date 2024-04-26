import { useEffect } from 'react';
import * as gu from './utils/global';
import Dashboard from './components/Dashboard';

const App = () => {
  useEffect(() => {
    console.log('app');
    gu.updatePrices();
    const int = setInterval(() => gu.updatePrices(), 60000);
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
