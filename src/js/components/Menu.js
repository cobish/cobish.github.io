import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {
  render() {
    return (
      <div id="home">
        <div className="avatar">
          <a href="javascript:void(0);"></a>
        </div>
        <h1>cobish</h1>
        <div className="link">
          <Link to="all">全部</Link>
          <a href="#/archive">归档</a>
          <a href="#/tags">标签</a>
        </div>
      </div>
    );
  }
};