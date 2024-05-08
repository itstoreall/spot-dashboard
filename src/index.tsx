import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';
import './styles/reset.scss';

import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4466/graphql',
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
