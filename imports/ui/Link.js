import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Links } from '../api/links';

import LinksList from './LinksList.js';

class Link extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Your Links</h1>
        <button onClick={this.logout}>Logout</button>
        <LinksList />
        <p>Add Link</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </React.Fragment>
    );
  }
  onSubmit = e => {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Links.insert({ url, userId: Meteor.userId() });
      this.refs.url.value = '';
    }
  }
  logout = () => {
    Accounts.logout();
  }
}

export default withRouter(Link);