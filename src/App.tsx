import Layout from './components/Layout';
import Guard from './components/Guard';

const App = () => (
  <Guard>
    <Layout />
  </Guard>
);

export default App;
