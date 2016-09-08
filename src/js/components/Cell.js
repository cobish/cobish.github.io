import React, { Component } from 'react';

export default class Cell extends Component {
  render() {
    return (
      <li className="list-post">
        <span className="date-long">{this.props.created_at.substr(0, 10)}</span>
        <a href={'#post/' + this.props.number}>{this.props.title}</a>
      </li>
    );
  }
};