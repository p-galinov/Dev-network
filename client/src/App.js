import './App.css';
import { useEffect } from 'react';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing"

import Routes from "./components/routing/Routes";

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utlis/setAuthToken';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
  <Provider store={store}>
    <Router>
      <Navbar />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route component={Routes} />
        </Switch>
    </Router>
  </Provider>
  );
}

export default App;
