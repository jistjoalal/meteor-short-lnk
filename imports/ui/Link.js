import React, { Component } from 'react';

import LinksList from './LinksList.js';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

export default Link = props =>
  <>
    <PrivateHeader title="Short Lnk" />
    <LinksListFilters />
    <AddLink />
    <LinksList />
  </>