// import { combineReducers } from 'redux';
import objectAssign from 'object-assign';
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
      return objectAssign({}, defaultIssuesState, {
        isFetching: true
      });

    case RECEIVE_ISSUES:
      // 接收issues
      return objectAssign({}, defaultIssuesState, {
        isFetching: false,
        items: action.posts
      });

    default:
      return defaultIssuesState;
  }
}

export default postIssues;

