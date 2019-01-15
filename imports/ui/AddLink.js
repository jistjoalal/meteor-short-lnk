import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class AddLink extends Component {
  render() {
    return (
      <>
        <p>Add Link</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" ref="url" placeholder="URL" />
          <button>Add Link</button>
        </form>
      </>
    );
  }
  onSubmit = e => {
    e.preventDefault();
    const url = this.refs.url.value.trim();
    if (url) {
      Meteor.call('links.insert', url);
      this.refs.url.value = '';
    }
  }
}


     