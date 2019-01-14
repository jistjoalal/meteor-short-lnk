import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Links extends Component {
  render() {
    return (
      <React.Fragment>
        <p>links component</p>
        <button onClick={this.logout}>Logout</button>
      </React.Fragment>
    );
  }
  logout = () => {
    Accounts.logout();
  }
}

export default withRouter(Links);