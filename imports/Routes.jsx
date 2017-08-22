import React from "react";
import ReactDOM from "react-dom";

import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import { App } from './ui/App.jsx';
import { HomePage } from './ui/pages/HomePage.jsx';
import ObservePage from './ui/pages/ObservePage.jsx';
import ContributePage from './ui/pages/ContributePage.jsx';
import { NotFoundPage } from './ui/pages/NotFoundPage.jsx';

export const Routes = () => (

  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />
      <Route path="home" component={HomePage} />
      <Route path="observe" component={ObservePage} />
      <Route path="contribute" component={ContributePage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>

);
