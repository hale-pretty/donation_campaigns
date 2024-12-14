import { BrowserRouter } from "react-router-dom";
// import { Provider } from 'react-redux';
import AppBar from './components/AppBar/AppBar';
import Router from './pages/router';

const App = () => {
  return (
    // <Provider>
      <BrowserRouter>
        <AppBar />
        <Router />
      </BrowserRouter>
    // </Provider>
  );
};

export default App;
