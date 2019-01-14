import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
    };
  }
  onSubmit = e => {
    e.preventDefault();

    const email = this.refs.email.value.trim();
    const password = this.refs.password.value.trim();

    Meteor.loginWithPassword({ email }, password, err => {
      console.log('Login callback', err);
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Short Lnk</h1>

        { !this.state.error ? null : <p>{this.state.error}</p> }

        <form onSubmit={this.onSubmit}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Login</button>
        </form>

        <Link to="/signup">Register</Link>
      </React.Fragment>
    );
  }
}

export default Login;