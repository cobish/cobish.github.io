import fetch from 'isomorphic-fetch';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { CONFIG } from '../constants/Config.js';

// 获取issues
function requestIssues() {
  return {
    type: REQUEST_ISSUES
  };
}

// 接收issues
function receiveIssues(json) {
  return {
    type: RECEIVE_ISSUES,
    posts: json
  };
}

// thunk action creater
export function fetchIssues() {
  return dispatch => {
    dispatch(requestIssues());

    let url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`,
        href = `https://github.com/${CONFIG.owner}/${CONFIG.repo}/issues`;

    // 添加参数
    url += `?creator=${CONFIG.owner}&per_page=1000&access_token=${CONFIG.token}`;

    return fetch(url)
      .then(response => response.json())
      .then(json => 
        dispatch(receiveIssues(json))
      )
      .catch(e => {
        window.location.href = href;
      });
  };
}

function shouldFetchIssues(state) {
  if (!state) {
    return true;
  }

  return !state.items.length;
}

// 按需获取issues
export function fetchIssuesIfNeeded() {
  // 当已经有issues的时候，则减少网络请求
  return function(dispatch, getState) {
    if ( shouldFetchIssues(getState()) ) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchIssues());
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}












