import ReactDOM from 'react-dom/client';
import Routes from './routes/Routes.tsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './assets/main.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<Routes />);
