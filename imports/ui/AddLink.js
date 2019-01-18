import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      isOpen: false,
      error: '',
    };
  }
  render() {
    return (
      <>
        <button className="button"
          onClick={() => this.setState({ isOpen: true })}
        >
          + Add Link
        </button>
        <Modal 
          isOpen={this.state.isOpen} 
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose}
        >
          <h1>Add Link</h1>
          {!this.state.error ? null
          : <p>{this.state.error}</p>}

          <form onSubmit={this.onSubmit}>
            <input type="text" placeholder="URL" ref="url"
              value={this.state.url} onChange={this.onChange} />
            <button>Add Link</button>
          </form>

          <button onClick={this.handleModalClose}>
            Cancel 
          </button>
        </Modal>
      </>
    );
  }
  handleModalClose = () => {
    this.setState({
      isOpen: false,
      url: '',
      error: '',
    });
  }
  onChange = e => {
    this.setState({
      url: e.target.value.trim(),
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const { url } = this.state;
    Meteor.call('links.insert', url, (err, res) => {
      if (!err) {
        this.handleModalClose();
      } else {
        this.setState({
          error: err.reason,
        });
      }
    });
  }
}


     