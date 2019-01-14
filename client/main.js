import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

// routes
const history = createBrowserHistory();
const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Link} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

// redirects
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links']

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  const pathName = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.push('/links');
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    history.push('/');
  }
});

// render
Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});