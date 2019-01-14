import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

// basic auth
const onEnterPublicPage = Component => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />;
  }
  return <Component />
}
const onEnterPrivatePage = Component => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />;
  }
  return <Component />
}

// routes
const history = createBrowserHistory();
const AppRouter = () => (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={() => onEnterPublicPage(Login)} />
      <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
      <Route path="/links" render={() => onEnterPrivatePage(Link)} />
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
    history.replace('/links');
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
});

// render
Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});