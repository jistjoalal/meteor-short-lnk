import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

export default class LinksListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false,
    }
  }
  indicateCopy() {
    this.setState({ justCopied: true });
    setTimeout(() => {
      this.setState({ justCopied: false });
    }, 1000);
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy)
      .on('success', () => this.indicateCopy())
      .on('error', () => alert("Couldn't copy to clipboard"));
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  render() {
    return (
      <div>
        <p>{this.props.url}</p>
        <p>{this.props.shortUrl}</p>
        <p>{this.props.visible.toString()}</p>
        <p>{this.props.visitedCount} - {this.props.lastVisitedAt}</p>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}>
          {this.state.justCopied ? 'Copied' : 'Copy'} 
        </button>
        <button onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    )
  }
}

LinksListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  shortUrl: PropTypes.string.isRequired,
  visitedCount: PropTypes.number.isRequired,
  lastVisitedAt: PropTypes.number,
}