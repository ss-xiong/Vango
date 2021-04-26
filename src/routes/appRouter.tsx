import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import { IndexPage } from '@Views/IndexPage';
import { ListPage } from '@Views/ListPage';

const AppRouter: React.FC = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/index" />
    </Route>
    <Switch>
      <Route exact path="/index" component={IndexPage} />
      <Route exact path="/list" component={ListPage} />
    </Switch>
  </Router>
);

export {
  AppRouter,
};
