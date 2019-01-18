import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';
import moment from 'moment';

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
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if (typeof this.props.lastVisitedAt === 'number') {
      const time = moment(this.props.lastVisitedAt);
      visitedMessage = `(visited ${time.fromNow()})`
    }
    return <p className="item__message">
      {this.props.visitedCount} {visitMessage} {visitedMessage}
    </p>
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a className="button button--pill button--link"
          href={this.props.shortUrl} target="_blank"
        >
          Visit
        </a>
        <button className="button button--pill"
          ref="copy" data-clipboard-text={this.props.shortUrl}
        >
          {this.state.justCopied ? 'Copied' : 'Copy'} 
        </button>
        <button className="button button--pill"
          onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}
        >
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