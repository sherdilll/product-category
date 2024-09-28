import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductListing from "./components/ProductListing";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ProductListing} />
      </Switch>
    </Router>
  );
};

export default App;
