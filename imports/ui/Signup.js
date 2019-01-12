import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

class Signup extends Component {
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

    Accounts.createUser({ email, password }, err => {
      console.log('signup callback', err);
    });

    // this.setState({
    //   error: 'asdf',
    // });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Signup</h1>

        { !this.state.error ? null : <p>{this.state.error}</p> }

        <form onSubmit={this.onSubmit}>
          <input type="email" ref="email" name="email" placeholder="Email" />
          <input type="password" ref="password" name="password" placeholder="Password" />
          <button>Create Account</button>
        </form>

        <Link to="/">Login</Link>
      </React.Fragment>
    );
  }
}

export default Signup;