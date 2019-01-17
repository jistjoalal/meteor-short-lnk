import React, { Component } from 'react';

import LinksList from './LinksList.js';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';

export default Link = props =>
  <>
    <PrivateHeader title="Your Links" />
    <LinksList />
    <AddLink />
  </>