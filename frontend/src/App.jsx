import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import AppBar from './components/AppBar/AppBar';
import Router from './pages/router';
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppBar />
        <Router />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
