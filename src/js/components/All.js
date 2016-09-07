import React, { Component } from 'react';
import { Link } from 'react-router';

export default class All extends Component {
  render() {
    return (
      <div className="list">
        <h2 className="category">全部</h2>
        <ul>
          <li className="list-post">
            <span className="date-long">2016-01-01</span>
            <a href="#">文章xxx</a>
          </li>
        </ul>
      </div>
    );
  }
};