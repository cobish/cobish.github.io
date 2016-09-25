import React, { Component } from 'react';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { CONFIG } from '../constants/Config.js';
import NProgress from 'nprogress';

import App from '../containers/App.js';

import '../../css/reset.scss';
import '../../css/fonts.scss';
import '../../css/index.scss';
import '../../css/nprogress.scss';
import '../../css/zenburn.scss';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

var Menu = (location, cb) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  cb(null, require('../components/Menu.js').default);
};

var All = (location, cb) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    cb(null, require('../containers/All.js').default);
  }, 'all');
};

var Archive = (location, cb) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    cb(null, require('../containers/Archive.js').default);
  }, 'archive');
};

var Tags = (location, cb) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    cb(null, require('../containers/Tags.js').default);
  }, 'tags');
};

var Post = (location, cb) => {
  document.title = CONFIG.titleLoad;
  NProgress.start();
  require.ensure([], require => {
    cb(null, require('../containers/Post.js').default);
  }, 'post');
};

const routes = (
  <Route path="/" component={App}>
    <IndexRoute getComponent={Menu} />
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