import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Link extends Component {
  render() {
    return (
      <React.Fragment>
        <p>link component</p>
        <button onClick={this.logout}>Logout</button>
      </React.Fragment>
    );
  }
  logout = () => {
    Accounts.logout();
  }
}

export default withRouter(Link);