// import { Provider } from 'react-redux';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import AppBar from './components/AppBar/AppBar';
import Router from './pages/router';

const App = () => {
  return (
    // <Provider>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<AppBar />}></Route>
        <Route exact path="/individuals" element={<Page404 />}></Route>
        <Route exact path="/individuals/:id">
          <Route exact path="" element={<Profile path="" />}></Route>
          <Route exact path="profile" element={<Profile path="" />}></Route>
          <Route exact path="campaigns" element={<Profile path="campaigns" />}></Route>
          <Route exact path="contributions" element={<Profile path="contributions" />}></Route>
          <Route exact path="edit/:edittab" element={<Profile path="edit" />}></Route>
        </Route>
        <Route element={<Router />}></Route>
      </Routes>
      </BrowserRouter>
    // </Provider>
  );
};

export default App;
