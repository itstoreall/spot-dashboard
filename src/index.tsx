import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';
import './styles/reset.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);