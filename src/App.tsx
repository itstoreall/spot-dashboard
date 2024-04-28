import { useEffect } from 'react';
import * as gu from './utils/global';
import Dashboard from './components/Dashboard';

const delay = 5000; // 5 sec
// const delay = 60000 // 1 min
// const delay = 600000; // 10 min

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
