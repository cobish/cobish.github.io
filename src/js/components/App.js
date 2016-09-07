import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <div id="logo">
          <a href="#/">cobish.github.io</a>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
};