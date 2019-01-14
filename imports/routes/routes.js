import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Signup from '../ui/Signup';
import Links from '../ui/Links';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

// AUTHENTICATION
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links']
// logged in + public => /links
const onEnterPublicPage = Component => {
  if (Meteor.userId()) {
    return <Redirect to="/links" />;
  }
  return <Component />
}
// logged out + private => /
const onEnterPrivatePage = Component => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />;
  }
  return <Component />
}
// called in client/main.js 
export const onAuthChange = isAuthenticated => {
  const pathName = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
  const isAuthenticatedPage = authenticatedPages.includes(pathName);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  }
  if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
}

// ROUTES
const history = createBrowserHistory();
export const AppRouter = () => (
  <Router history={history}>
    <Switch>
      {/* Public */}
      <Route path="/" exact render={() => onEnterPublicPage(Login)} />
      <Route path="/signup" render={() => onEnterPublicPage(Signup)} />
      {/* Private */}
      <Route path="/links" render={() => onEnterPrivatePage(Links)} />
      {/* Generic */}
      <Route component={NotFound} />
    </Switch>
  </Router>
);