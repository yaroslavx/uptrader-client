import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'

const rootElement = document.querySelector('#root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <App />
  );
}
