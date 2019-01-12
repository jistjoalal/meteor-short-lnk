import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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
    this.props.history.push('/');
  }
}

export default withRouter(Link);