import React, { Component } from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from '../components/App.js';
import Menu from '../components/Menu.js';
import All from '../containers/All.js';
import Archive from '../containers/Archive.js';
import Tags from '../containers/Tags.js';
import Post from '../containers/Post.js';

import '../../css/reset.scss';
import '../../css/fonts.scss';
import '../../css/index.scss';
import '../../css/nprogress.scss';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Menu} />
    <Route path="all" component={All} />
    <Route path="archive" component={Archive} />
    <Route path="tags" component={Tags} />
    <Route path="post/:id" component={Post} />
  </Route>
);

export default class Root extends Component {
  render() {
    return <Router history={appHistory} routes={routes} />
  }
};