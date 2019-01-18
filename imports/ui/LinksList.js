import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { Links } from '../api/links';

import LinksListItem from './LinksListItem';

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
      const links = Links.find({
        visible: Session.get('showVisible'),
      }).fetch();
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
    return this.state.links.map(link => {
      const shortUrl = Meteor.absoluteUrl(link._id);
      return <LinksListItem key={link._id} shortUrl={shortUrl} {...link} />
    }
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