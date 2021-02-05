import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Page404 from "../errors/Page404";
import Home from "../pages/Home";

const Routes = ({ component: Component, ...rest }) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/home" component={Home} exact />

        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
