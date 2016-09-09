// import fetch from 'isomorphic-fetch';
import $ from 'jquery';
import { REQUEST_ISSUES, RECEIVE_ISSUES } from '../constants/ActionTypes.js';
import { CONFIG } from '../constants/Config.js';

// 获取issues
function requestIssues(filter, perPage) {
  return {
    type: REQUEST_ISSUES,
    filter,
    perPage
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
export function fetchIssues(filter, perPage) {
  return dispatch => {
    dispatch(requestIssues(filter, perPage));

    let url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/issues`,
        href = `https://github.com/${CONFIG.owner}/${CONFIG.repo}/issues`;

    return $.ajax({
      url: url,
      data: {
        filter,
        per_page: perPage,
        // access_token: CONFIG['access_token']
      },
      success: json => {
        dispatch(receiveIssues(json));
      },
      error: () => {
        window.location.href = href;
      }
    });

    // fetch 获取 json 有问题
    // return fetch(url, { method: 'GET' })
    //   .then(response => {
    //     response.json();
    //   })
    //   .then(json => {
    //     console.log(json)
    //     dispatch(receiveIssues(json));
    //   });
    //   .catch(e => {
    //     window.location.href = href;
    //   });
  };
}

function shouldFetchIssues(state) {
  if (!state) {
    return true;
  }

  return !state.items.length;
}

// 按需获取issues
export function fetchIssuesIfNeeded(filter, perPage) {
  // 当已经有issues的时候，则减少网络请求
  return function(dispatch, getState) {
    if ( shouldFetchIssues(getState()) ) {
      // 在 thunk 里 dispatch 另一个 thunk！
      return dispatch(fetchIssues(filter, perPage));
    } else {
      // 告诉调用代码不需要再等待。
      return Promise.resolve();
    }
  };
}












