import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./app";
import StorePicker from "./components/store-picker";
import NotFound from "./components/not-found";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
