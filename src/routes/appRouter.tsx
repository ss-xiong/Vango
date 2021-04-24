import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';

import DataListsPage from '@Views/dataListsPage';
import DataLabelsPage from '@Views/dataLabelsPage';

const AppRouter: React.FC = () => (
  <Router>
    <Route exact path="/">
      <Redirect to="/data-lists" />
    </Route>
    <Switch>
      <Route path="/data-lists" component={DataListsPage} />
      <Route path="/data-labels" component={DataLabelsPage} />
    </Switch>
  </Router>
);

export default AppRouter;
