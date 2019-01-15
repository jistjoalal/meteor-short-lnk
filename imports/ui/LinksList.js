import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Links } from '../api/links';

export default class LinksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [],
    };
  }
  componentDidMount() {
    console.log('comp did mount linkslist');
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({}).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    console.log('comp will unmount linkslist');
    this.linksTracker.stop();
  }
  renderLinksListItems = () => {
    if (this.state.links.length === 0) {
      return <p>No links</p>
    }
    return this.state.links.map(link =>
      <p key={link._id}>{link.url}</p>
    );
  }
  render() {
    return (
      <div>
        <p>Links List</p>
        <div>
          { this.renderLinksListItems() }
        </div>
      </div>
    );
  }
}