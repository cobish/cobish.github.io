import React, { Component } from 'react';
import Cell from './Cell.js';

export default class CellView extends Component {
  render() {
    return (
      <div>
        <h2 className="category">{this.props.title}</h2>
        <ul>
          {
            this.props.items.map((item, index) => 
              <Cell {...item} key={index} />
            )
          }
        </ul>
      </div>
    );
  }
};