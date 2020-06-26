import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CheckAuthentication from "./components/CheckAuthentication";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
        <StoreProvider>
            <Route exact path='/'>
              <CheckAuthentication />
            </Route>
          </StoreProvider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
