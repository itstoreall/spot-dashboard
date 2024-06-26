import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import GET_ACTIONS from '../../gql/getActions';
import state from '../../state';
import Loader from '../Loader';
import Header from '../Header';
import Dashboard from '../Dashboard';
import Footer from '../Footer';

const Layout = () => {
  const [isActions, setIsActions] = useState(false);

  const { data, refetch } = useQuery(GET_ACTIONS); // { fetchPolicy: 'network-only' }

  useEffect(() => {
    if (!data) return;
    state.actions.value = data?.getActions.actions;
    setIsActions(true);
  }, [data]);

  if (!isActions) return <Loader />;

  const actions = data?.getActions;

  return (
    <>
      <Header isUpdated={actions.isUpdated} />
      <Dashboard data={actions} refetchActions={refetch} />
      <Footer />
    </>
  );
};

export default Layout;

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

const [addAction, { data, loading, error }] = useMutation(ADD_ACTION);

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
*/

/*
const GET_ACTION_BY_ID = gql`
  query GetActionByID($id: ID!) {
    getActionByID(id: $id) {
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

const { data: dataByID } = useQuery(GET_ACTION_BY_ID, { variables: { id: '663791707a83f53c632f907c' } });
*/
