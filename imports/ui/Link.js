import React, { Component } from 'react';

import LinksList from './LinksList.js';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

class Link extends Component {
  render() {
    return (
      <>
        <PrivateHeader title="Your Links" />
        <LinksList />
        <AddLink />
      </>
    );
  }
}

export default Link;