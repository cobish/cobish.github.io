import React, { Component } from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import App from '../components/App.js';
import Menu from '../components/Menu.js';

import '../../css/reset.scss';
import '../../css/fonts.scss';
import '../../css/index.scss';
import '../../css/nprogress.scss';
import '../../css/zenburn.scss';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var All = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../containers/All.js').default);
  }, 'all');
};

var Archive = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../containers/Archive.js').default);
  }, 'archive');
};

var Tags = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../containers/Tags.js').default);
  }, 'tags');
};

var Post = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('../containers/Post.js').default);
  }, 'post');
};

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Menu} />
    <Route path="all" getComponent={All} />
    <Route path="archive" getComponent={Archive} />
    <Route path="tags" getComponent={Tags} />
    <Route path="post/:id" getComponent={Post} />
  </Route>
);

export default class Root extends Component {
  render() {
    return <Router history={appHistory} routes={routes} />
  }
};