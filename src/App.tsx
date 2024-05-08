import { useEffect, useState } from 'react';
import { effect } from '@preact/signals-react';
import { gql, useQuery } from '@apollo/client';
// import * as gt from './types/global';
import * as gu from './utils/global';
import state from './state';
import Loader from './components/Loader';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const { status } = state.system;

const delay = Number(process.env.REACT_APP_UPDATE_DELAY || 600000);

// const HELLO_QUERY = gql`
//   query GetHello {
//     hello
//   }
// `;

// const GET_USER_QUERY = gql`
//   query GetUser {
//     getUser(id: "444")
//   }
// `;

// const GET_ACTIONS = gql`
//   query GetActions {
//     getActions(){
//       id
//     }
//   }
// `;

const GET_ACTIONS = gql`
  query GetActions {
    getActions {
      id
      tokenId
      token
      action
      average_price
      prices
      status
    }
  }
`;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ---

  // const { loading, data } = useQuery(HELLO_QUERY);
  // const { loading: l2, error: e2, data: d2 } = useQuery(GET_USER_QUERY);
  const { data: d2 } = useQuery(GET_ACTIONS, { fetchPolicy: 'network-only' });

  // console.log('data --->', data);
  // console.log('getUser --->', d2?.getUser);
  console.log('getActions --->', d2);

  // ---

  useEffect(() => {
    gu.getInitData();
    const int = setInterval(() => gu.updatePrices(), delay);
    return () => {
      clearInterval(int);
    };
  }, []);

  effect(() => {
    setTimeout(() => isLoading && status.value && setIsLoading(false), 2000);
  });

  // console.log('status:', status.value);

  // if (loading) return <Loader />;

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
