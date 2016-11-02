import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store/configureStore.js';
import Root from './containers/Root.js';

let store = configureStore();

// let store;

// if (__DEV__) {
//   let mockStore = {
//     isFetching: false,
//     items: [{
//       body: "我们在开发中都会遇到这样一种情况：先给 Window 绑定一个 ``scroll`` 事件，然后打印日志，代码如下。打开浏览器，滚动一下鼠标，便会发现日志被频繁地打印出来。类似这样的事件还是 Window 的 ``resize`` 事件、输入框的 ``keyup`` 事件、拖拽时的 ``mousemove`` 事件等等。\r\n\r\n```javascript\r\n$(window).on('scroll', function() {\r\n  console.log(111);\r\n});\r\n```\r\n\r\n它们都有以下两个特点：\r\n\r\n- 事件发生后会被频繁地调用；\r\n- 都是浏览器自带的事件，无法对其进行代码修改。\r\n\r\n既然无法对这些事件进行改动，那么我们只能在被调用的函数中想办法优化了。因为使用场景的不同，所以有 ``函数防抖`` 和 ``函数节流`` 这两种优化方案，下面将逐一进行介绍。\r\n\r\n## 函数防抖\r\n\r\n**如果用手指一直按住一个弹簧，它将不会弹起直到你松手。**函数防抖 ``debounce`` 就是给函数设置一个定时器，n 秒之后才调用函数，n 秒内如果再次设置定时器的话，则会重新定时 n 秒后执行函数。\r\n\r\n函数防抖的简单实现：\r\n\r\n```javascript\r\n/**\r\n * 函数防抖\r\n * @param  {Function} 调用的函数\r\n * @param  {Int}      时间\r\n * @return {Function} 返回客户调用函数\r\n */\r\nvar debounce = function(action, time) {\r\n  var timer = null;\r\n    return function() {\r\n      var context = this,\r\n          args = arguments;\r\n\r\n      clearTimeout(timer);\r\n        timer = setTimeout(function() {\r\n        action.apply(context, args);\r\n      }, time);\r\n    }\r\n};\r\n```\r\n\r\n这时如果我们再结合 Window 的 scroll 事件，可以发现控制台里的打印明细打印少了很多，而且几乎是在停止 scroll 了之后才会去调用 ``doResize`` 函数（主要是因为设置的事件为 500 毫秒）。\r\n\r\n```javascript\r\nfunction doResize() {\r\n  console.log(arguments);\r\n}\r\n\r\nvar action = debounce(doResize, 500);\r\n$(window).on('resize', action);\r\n```\r\n\r\n## 函数节流\r\n\r\n**如果将水龙头拧紧直到水是以水滴的形式流出，那你会发现每隔一段时间，就会有一滴水流出。**函数节流 ``throttle`` 顾名思义就是节约使用函数次数的意思。\r\n\r\n有一种场景，一个输入框在 keyup 之后需获取到输入的值去 ajax 请求，如果是正常实现的话，那 ajax 请求的数量则太大了。如果是使用 ``debounce`` 的话，则会在用户输入完毕后的 n 秒后才会去 ajax 请求。我们需要的只是减少 keyup 事件的触发，而不是完全禁止它等到最后一个 keyup 才触发。这时我们就可以使用函数节流``throttle``。\r\n\r\n函数节流的简单实现：\r\n\r\n```javascript\r\n/**\r\n * 函数节流\r\n * @param  {Function} 调用的函数\r\n * @param  {Int}      时间，单位毫秒\r\n * @return {Function} 返回客户调用函数\r\n */\r\nvar throttle = function(action, delay) {\r\n  var last = 0;\r\n  return function() {\r\n    var curr = +new Date();\r\n    if (curr - last > delay) {\r\n      action.apply(this, arguments);\r\n      last = curr;\r\n    }\r\n  };\r\n}\r\n```\r\n\r\n再结合输入框的 keyup 事件，就可以看出 keyup 调用的频率明显减少了。\r\n\r\n```javascript\r\nfunction doInput() {\r\n  console.log($(this).val());\r\n}\r\n\r\nvar action = throttle(doInput, 1000);\r\n$('#txt').on('keyup', action);\r\n```\r\n\r\n## 使用 underscore.js\r\n\r\n``underscore.js`` 有对 ``debounce`` 和 ``throttle`` 的分别实现。将上面的代码修改如下：\r\n\r\n```javascript\r\n// debounce\r\nvar resizeAction = _.debounce(doResize, 500);\r\n$(window).on('resize', resizeAction);\r\n\r\n// throttle\r\nvar keyupAction = _.throttle(doInput, 1000);\r\n$('#txt').on('keyup', keyupAction);\r\n```\r\n\r\n## 参考\r\n\r\n- http://www.cnblogs.com/fsjohnhuang/p/4147810.html\r\n- https://segmentfault.com/a/1190000002764479\r\n",
//       created_at: '2016-08-19T08:54:33Z',
//       labels: [{
//         name: '前端'
//       }],
//       number: 4,
//       title: '函数防抖与函数节流'
//     }, {
//       body: '2014 年是一个转站点，前半个学期我还是以一个学生的身',
//       created_at: '2016-08-10T08:54:33Z',
//       labels: [{
//         name: '随笔'
//       }],
//       number: 3,
//       title: '我的 2014'
//     }, {
//       body: '在使用 Grunt 之前，项目静态文件几乎没进行压缩合并便直接放到线上，部分文',
//       created_at: '2016-08-09T08:54:33Z',
//       labels: [{
//         name: '构建打包'
//       }, {
//         name: '随笔'
//       }],
//       number: 2,
//       title: 'Grunt'
//     }, {
//       body: '2014 年是一个转站点，前半个学期我还是以一个学生的身',
//       created_at: '2015-08-19T08:54:33Z',
//       labels: [{
//         name: '随笔'
//       }],
//       number: 1,
//       title: '博客进化史'
//     },{
//       body: '2014 年是一个转站点，前半个学期我还是以一个学生的身',
//       created_at: '2015-08-19T08:54:33Z',
//       labels: [{
//         name: '随笔'
//       }],
//       number: 1,
//       title: '博客进化史'
//     }, {
//       body: '2014 年是一个转站点，前半个学期我还是以一个学生的身',
//       created_at: '2015-08-19T08:54:33Z',
//       labels: [{
//         name: '随笔'
//       }],
//       number: 1,
//       title: '博客进化史'
//     }]
//   };

//   store = configureStore(mockStore);
// } else {
//   store = configureStore();
// }

render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('container')
);