import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchIssuesIfNeeded } from '../actions/index.js';
import NProgress from 'nprogress';
import Article from '../components/Article.js';
 
class Post extends Component {
  constructor(props) {
    super(props);
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
            <Article {...item}  key={index} />
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