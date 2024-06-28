import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Routes from './routes/index';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes />
    </BrowserRouter>
  );
};

export default App;
