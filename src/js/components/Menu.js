import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import NProgress from 'nprogress';

class Menu extends Component {
  componentWillMount() {
    NProgress.start();
  }

  componentDidMount() {
    NProgress.done();
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
      NProgress.start();
  }

  render() {
    return (
      <div id="home">
        <div className="avatar">
          <a href="https://github.com/cobish"></a>
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

export default withRouter(Menu);