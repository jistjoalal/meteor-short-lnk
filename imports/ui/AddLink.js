import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
    };
  }
  render() {
    return (
      <>
        <button onClick={() => this.setState({ isOpen: true })}>
          + Add Link
        </button>
        <Modal isOpen={this.state.isOpen} contentLabel="Add Link">
          <p>Add Link</p>
          <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="URL"
              value={this.state.url} onChange={this.onChange} />
            <button>Add Link</button>
          </form>
          <button onClick={() => this.setState({
            isOpen: false,
            url: '',
          })}>
            Cancel 
          </button>
        </Modal>
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
          this.setState({
            url: '',
            isOpen: false,
          });
        }
      });
    }
  }
}


     