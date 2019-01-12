import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Signup from '../imports/ui/Signup';
import Link from '../imports/ui/Link';
import NotFound from '../imports/ui/NotFound';
import Login from '../imports/ui/Login';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/links" component={Link} />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
});