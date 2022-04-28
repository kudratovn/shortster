import React from "react";
import { Router as Rr, Route, Switch, Redirect } from "react-router-dom";

import { CreateUrlPage } from "../pages/create/CreateUrlPage";
import { GetUrlPage } from "../pages/get/GetUrlPage";
import { RedirectPage } from "../pages/redirect/RedirectPage";

import { ROUTES } from "../constants/router";
import { browserHistory } from "../services/BrowserHistory";

export const Router: React.FC = () => (
    <Rr history={browserHistory}>
      <Switch>
        <Route path={ROUTES.ROOT} exact component={() => <Redirect to={ROUTES.URL} />} />
        <Route path={ROUTES.URL} component={CreateUrlPage} />
        <Route path={`${ROUTES.URL}/shortcode`} component={RedirectPage} />
        <Route path={`${ROUTES.URL}/shortcode/stats`} component={GetUrlPage} />
      </Switch>
    </Rr>
  );