// import { combineReducers } from 'redux';
import { FETCH_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { fetchIssues, receiveIssues } from '../actions/index.js';

var defaultIssuesState = {
  isFetching: false,
  items: []
};

// issues reducer
function postIssues(defaultIssuesState, action) {
  switch (action.type) {
    case FETCH_ISSUES:
      // 获取issues
      return Object.assign({}, defaultIssuesState, {
        isFetching: true
      });

    case RECEIVE_ISSUES:
      // 接收issues
      return Object.assign({}, defaultIssuesState, {
        isFetching: false,
        items: action.posts
      });

    default:
      return defaultIssuesState;
  }
}

export default postIssues;

