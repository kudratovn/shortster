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
        <Route path={ROUTES.ROOT} exact component={() => <Redirect to={ROUTES.CREATE} />} />
        <Route path={ROUTES.CREATE} component={CreateUrlPage} />
        <Route path={ROUTES.REDIRECT} component={RedirectPage} />
        <Route path={ROUTES.GET} component={GetUrlPage} />
      </Switch>
    </Rr>
  );