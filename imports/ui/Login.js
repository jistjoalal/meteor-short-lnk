import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Login to Short Lnk</h1>
        
        <p>login form here</p>

        <Link to="/signup">Register</Link>
      </React.Fragment>
    );
  }
}

export default Login;