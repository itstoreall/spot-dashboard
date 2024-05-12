import { useEffect, useState } from 'react';
import { effect } from '@preact/signals-react';
import { gql, useQuery } from '@apollo/client';
// import * as gt from './types/global';
import * as gu from './utils/global';
// import * as ge from './enum/global';
import state from './state';
import Loader from './components/Loader';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

const { status } = state.system;

const delay = Number(process.env.REACT_APP_UPDATE_DELAY || 600000);

const GET_ACTIONS = gql`
  query GetActions {
    getActions {
      id
      tokenId
      token
      action
      average_price
      current_price
      prices
      percent
      status
    }
  }
`;

/*
const ADD_ACTION = gql`
  mutation AddAction($input: ActionInput!) {
    addAction(input: $input) {
      id
      tokenId
      token
      action
      average_price
      current_price
      prices
      percent
      status
    }
  }
`;
// */

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // ---

  const { data: d2 } = useQuery(GET_ACTIONS, { fetchPolicy: 'network-only' });
  // const [addAction, { data, loading, error }] = useMutation(ADD_ACTION);

  console.log('getActions --->', d2);

  // ---

  useEffect(() => {
    gu.getInitData();
    // handleCreateAction();
    const int = setInterval(() => gu.updatePrices(), delay);
    return () => {
      clearInterval(int);
    };
  }, []);

  effect(() => {
    setTimeout(() => isLoading && status.value && setIsLoading(false), 2000);
  });

  // ---

  /*
  const handleCreateAction = () => {
    addAction({
      variables: {
        input: {
          tokenId: 5,
          token: ge.Symbol.SOL,
          action: ge.Process.BUY,
          average_price: 30.55,
          current_price: 145.55,
          prices: [30.55],
          percent: 350.55,
          status: ge.ProcessStatus.INVESTED
        }
      }
    });
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>An error occurred</p>;
  // */

  // ---

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
