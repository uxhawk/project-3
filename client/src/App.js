import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
// import ProtectedRoutes from "./components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import StockMarket from "./pages/StockMarket";
import Goals from "./pages/Goals";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
        <StoreProvider>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          {/* <Route exact path='*' component={ProtectedRoutes} /> */}
          <Route exact path={['/dashboard', '/']} component={Dashboard} />
          <Route exact path='/stock-market' component={StockMarket} />
          <Route exact path='/goals' component={Goals} />
        </StoreProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
