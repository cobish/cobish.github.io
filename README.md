# cobish's blog

这是一个基于 ``github page`` 和 ``github api`` 搭建的单页面静态博客，点击[「这里」](http://cobish.github.io)查看博客。

## Fork 使用

将配置文件 ``src/js/constants/Config.js`` 的 ``百度统计`` 与 ``多说评论`` 配置修改成自己的账号。

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
  "build": "NODE_ENV=production webpack",
  "start:win": "set NODE_ENV=development && webpack-dev-server --hot --inline",
  "build:win": "set NODE_ENV=production && webpack"
},
```

#### 开发命令

``` bash
// Mac or Linux
$ npm start

// Windows
$ npm run start:win
```

#### 发布命令

``` bash
// Mac or Linux
$ npm run build

// Windows
$ npm run build:win
```

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
- IE10+

## 日志更新

### v3.3

- 去掉 -webkit-user-select；
- 修复 IE 报错 Object doesn't support property or method 'assign'，[参考链接](https://github.com/mozilla-services/react-jsonschema-form/issues/206)；
- 优化 nprogress 调用代码，简化组件内许多代码；
- 优化代码高亮代码；
- document title 完善提示。

### v3.2

- 开发命令支持 Mac、Linux 和 Windows；
- 按需加载 js（chunk） 文件；
- 分离出 css 文件。

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

