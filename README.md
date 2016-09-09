# cobish's blog

这是一个基于 ``github page`` 和 ``github api`` 搭建的单页面静态博客，点击[「这里」](http://cobish.github.io)查看博客。

## Fork 使用

将配置文件 ``config.js`` 的``百度统计``与``多说评论``配置修改成自己的账号。

## 命令使用

### 安装

``` bash
$ npm install webpack -g
$ npm install
```

### 运行

``` js
"scripts": {
  "start": "NODE_ENV=development webpack-dev-server --hot --inline",
  "build": "rm -rf dist && NODE_ENV=production webpack"
},
```

开发应用命令
``` bash
$ npm start
```

发布应用命令

``` bash
$ npm run build
```

目前命令在 **Mac** 是运行的了，**Windows** 保守估计应该是运行不了的。如想在 **Windows** 上运行需替换 ``NODE_ENV=development`` 和 ``rm -rf dist`` 这两条命令。God bless you.

## 技术栈

- react@15.3.1
- react-router@15.3.1
- redux@3.6.0
- webpack@1.13.2
- es6

## 浏览器兼容

- Chrome
- Firefox
- Safari
- 其它的我就不知道啦

## 日志更新

### v3.1

- 使用 react + react-router + redux + es6 重写博客。

### v3.0

- 将博客变成了一个单页面应用；
- 使用了 github api + issues 的方式显示博客文章。

### v2.3

- 添加文章页面标题的样式；
- 添加标签 ``<code>`` 的样式；
- 添加标签 ``<strong>`` 的样式。

### v2.2

- 重构 page 页面样式，让以前文章列表从居左变成居中。

### v2.1

- 代码高亮颜色修改；
- 优化页面请求，去掉非文章页面的接口调用；
- 百度统计只有在正式才调用。

### v2.0

- 界面外观大调整，采用简约风格。

### v1.0

- 个人博客新鲜出炉。

