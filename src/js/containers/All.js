import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import NProgress from 'nprogress';
import CellView from '../components/CellView.js';

class All extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchIssuesIfNeeded('created', 10000));
    
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
      NProgress.start();
  }

  render() {
    let showTemplate = () => {
      if (this.props.isFetching) {
        return null;
      }

      NProgress.done();
      return (
        <CellView title="全部" items={this.props.items} />
      );
    }

    return (
      <div className="list">
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

export default connect(mapStateToProps)(withRouter(All));
