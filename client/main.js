import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppRouter, onAuthChange } from '../imports/routes/routes';

import { Links } from '../imports/api/links';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);  
});

// render
Meteor.startup(() => {
  ReactDOM.render(<AppRouter />, document.getElementById('app'));
  Meteor.call('links.insert', 'ouch');
});