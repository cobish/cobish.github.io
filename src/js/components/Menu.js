import React, { Component } from 'react';
import { Link } from 'react-router';
import NProgress from 'nprogress';

export default class Menu extends Component {
  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
  }

  render() {
    return (
      <div id="home">
        <div className="avatar">
          <a href="javascript:void(0);"></a>
        </div>
        <h1>cobish</h1>
        <div className="link">
          <Link to="all">全部</Link>
          <Link to="archive">归档</Link>
          <Link to="tags">标签</Link>
        </div>
      </div>
    );
  }
};