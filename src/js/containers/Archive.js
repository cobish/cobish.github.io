import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import NProgress from 'nprogress';
import CellView from '../components/CellView.js';

class Archive extends Component {
  constructor(props) {
    super(props);
    this.spliceJson = this.spliceJson.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchIssuesIfNeeded('created', 10000));

    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave.bind(this));
  }

  routerWillLeave(nextLocation) {
      NProgress.start();
  }

  // 拼接 json
  spliceJson(items) {
    let list = this.props.items,
        len = list.length,
        year = 0,
        index = 0,
        articles = {};

    for (let i = 0; i < len; i++) {
      let time = parseInt(list[i]['created_at'].substring(0, 4));

      if (time !== year) {
        articles[time + '年'] = [];
        year = time;
      }

      articles[time + '年'].push(list[i]);
    }

    return articles;
  }

  render() {
    let showTemplate = () => {
      if (this.props.isFetching) {
        return null;
      }

      NProgress.done();

      let articles = this.spliceJson(this.props.items),
          view = [];

      for (let year in articles) {
        let yearShow = year.substring(0, year.length - 1);
        view.push(<CellView key={yearShow} title={yearShow} items={articles[year]} />);
      } 

      return view;
    };

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

export default connect(mapStateToProps)(withRouter(Archive));