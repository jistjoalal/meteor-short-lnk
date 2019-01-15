import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PrivateHeader extends Component {
  logout = () => {
    Accounts.logout();
  }
  render() {
    return (
      <>
        <h1>{this.props.title}</h1>
        <button onClick={this.logout}>Logout</button>
      </>
    );
  }
}

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
}