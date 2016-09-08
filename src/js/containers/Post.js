import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import NProgress from 'nprogress';
 
class Post extends Component {
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
      }

      NProgress.done();

      let view = [];
      this.props.items.map((item, index) => {
        if (parseInt(item.number) === parseInt(this.props.params.id)) {
          view.push(
            <div key={index}>
              {item.body}
            </div>
          );
        }
      });
      return view;
    };

    return (
      <div>{showTemplate()}</div>
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

export default connect(mapStateToProps)(Post);