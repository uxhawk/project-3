import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {StoreProvider} from './utils/GlobalState';
import Dashboard from './pages/Dashboard';
import StockMarket from './pages/StockMarket';
import Goals from './pages/Goals';
import Transaction from './pages/Transaction';
import './App.css';

/**
 * this is the base of the react app
 * @return {number} The sum of the two numbers.
 */
function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path={['/dashboard', '/']} component={Dashboard} />
            <Route exact path='/stock-market' component={StockMarket} />
            <Route exact path='/goals' component={Goals} />
            <Route exact path='/transaction' component={Transaction} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
