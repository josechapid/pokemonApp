import React from 'react';
import HomePage from "./components/Home/HomePage"
import LandinPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import { BrowserRouter  as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'redux';
import './App.css';

function App () {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={LandinPage} />
            <Route path="/home" component={HomePage} />
            <Route path="/detail/:pokemonId" component={DetailPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
