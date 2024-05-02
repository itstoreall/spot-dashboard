import { useEffect, useState } from 'react';
import { effect } from '@preact/signals-react';
// import * as gt from './types/global';
import * as gu from './utils/global';
import state from './state';
import Loader from './components/Loader';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const { status } = state.system;

const delay = Number(process.env.REACT_APP_UPDATE_DELAY || 600000);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    gu.getInitData();
    const int = setInterval(() => gu.updatePrices(), delay);
    return () => {
      clearInterval(int);
    };
  }, []);

  effect(() =>
    setTimeout(() => isLoading && status.value && setIsLoading(false), 2000)
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Header />
      <Dashboard />
      <Footer />
    </>
  );
};

export default App;
