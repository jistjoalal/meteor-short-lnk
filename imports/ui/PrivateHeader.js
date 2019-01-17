import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

export default PrivateHeader = props =>
  <>
    <h1>{props.title}</h1>
    <button onClick={() => Accounts.logout()}>Logout</button>
  </>

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
}