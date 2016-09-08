import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store/configureStore.js';
import Root from './containers/Root.js';



// const store = configureStore();

let store;

if (__DEV__) {
  let mockStore = {
    isFetching: false,
    items: [{
      body: 'abc',
      created_at: '2016-08-19T08:54:33Z',
      labels: [{
        name: '前端'
      }],
      number: 4,
      title: '函数防抖与函数节流'
    }, {
      body: '2014 年是一个转站点，前半个学期我还是以一个学生的身',
      created_at: '2016-08-10T08:54:33Z',
      labels: [{
        name: '随笔'
      }],
      number: 3,
      title: '我的 2014'
    }, {
      body: '在使用 Grunt 之前，项目静态文件几乎没进行压缩合并便直接放到线上，部分文',
      created_at: '2016-08-09T08:54:33Z',
      labels: [{
        name: '构建打包'
      }, {
        name: '随笔'
      }],
      number: 2,
      title: 'Grunt'
    }, {
      body: '2014 年是一个转站点，前半个学期我还是以一个学生的身',
      created_at: '2015-08-19T08:54:33Z',
      labels: [{
        name: '随笔'
      }],
      number: 1,
      title: '博客进化史'
    }]
  };

  store = configureStore(mockStore);
} else {
  store = configureStore();
}

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('container')
);