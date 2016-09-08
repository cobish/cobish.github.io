import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import NProgress from 'nprogress';

class All extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchIssuesIfNeeded('created', 10000));
  }

  render() {
    let showTemplate = () => {
      if (this.props.isFetching) {
        return null;
      } else {
        NProgress.done();

        let rows = [];
        this.props.items.forEach((item) => {
          rows.push(
            <li className="list-post" key={item.number}>
              <span className="date-long">{item.created_at.substr(0, 10)}</span>
              <a href="#">{item.title}</a>
            </li>
          );
        });

        return (
          <div className="list">
            <h2 className="category">全部</h2>
            <ul>{rows}</ul>
          </div>
        );
      }
    }

    return (
      <div>
        {showTemplate()}
      </div>
    );
  }
};

function mapStateToProps(state) {
  const {
    isFetching,
    items
  } = state || {
    isFetching: true,
    items: []
  };

  return {
    isFetching,
    items
  }
}

export default connect(mapStateToProps)(All);
