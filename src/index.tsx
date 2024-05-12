import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';
import './styles/reset.scss';

const gqlUrl = process.env.REACT_APP_GQL_URL;

const client = new ApolloClient({
  uri: gqlUrl,
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
