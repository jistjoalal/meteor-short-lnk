import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
    };
  }
  render() {
    return (
      <>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="URL"
            value={this.state.url} onChange={this.onChange} />
          <button>Add Link</button>
        </form>
      </>
    );
  }
  onChange = e => {
    this.setState({
      url: e.target.value.trim(),
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    if (url) {
      Meteor.call('links.insert', url, (err, res) => {
        if (!err) {
          this.setState({ url: '' });
        }
      });
    }
  }
}


     