import fetch from 'isomorphic-fetch';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { CONFIG } from '../constants/Menu.js';

// 获取issues
export function requestIssues(filter, perPage) {
  return {
    type: REQUEST_ISSUES,
    filter,
    perPage
  };
}

// 接收issues
export function receiveIssues(json) {
  return {
    type: RECEIVE_ISSUES,
    posts: json
  };
}

// thunk action creater
export function fetchIssues(filter, perPage) {
  return function(dispatch) {
    dispatch(requestIssues(filter, perPage));

    let url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues?filter=${filter}&per_page=${perPage}`,
        href = `https://github.com/${CONFIG.owner}/${CONFIG.repo}/issues`;

    return fetch(url, { method: 'GET'})
      .then(response => {
        response.json();
      })
      .then(json => {
        dispatch(receiveIssues(json));
      })
      .catch(e => {
        window.location.href = href;
      });
  };
}