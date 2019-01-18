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

    if (password.length < 9) {
      return this.setState({
        error: 'Password must be more than 8 characters',
      });
    }

    Accounts.createUser({ email, password }, err => {
      if (err) {
        this.setState({
          error: err.reason,
        });
      }
      else {
        this.setState({
          error: '',
        });
      }
    });


  }
  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup</h1>

          { !this.state.error ? null : <p>{this.state.error}</p> }

          <form onSubmit={this.onSubmit} noValidate>
            <input type="email" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button>Create Account</button>
          </form>

          <Link to="/">Login</Link>
        </div>
      </div>
    );
  }
}

export default Signup;