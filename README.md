# cobish's blog

这是一个基于 ``github page`` 和 ``github api`` 搭建的单页面静态博客，点击[「这里」](http://cobish.github.io)查看博客。

## Fork 使用

1. 将配置文件 ``src/js/constants/Config.js`` 的 ``百度统计`` 配置修改成自己的账号。
2. 将配置文件里的 token 修改成自己 Github 的 access_token，详情参考[「这里」](https://liuhongjiang.github.io/hexotech/2015/12/04/calling-github-api/)。

## 环境搭建

### 运行环境

- [node.js@5.8.0](https://nodejs.org)

```bash
$ node -v
v5.8.0

$ npm -v
3.7.3
```

### 依赖

- webpack@1.13.2

```bash
$ npm install -g webpack@1.13.2
```

## 命令使用

### 安装

``` bash
$ cd cobish.github.io
$ npm install
```

### 运行

``` js
"scripts": {
  "dev": "cross-env NODE_ENV=development webpack-dev-server --hot --inline",
  "build": "cross-env NODE_ENV=production webpack"
},
```

#### 命令

``` bash
// 开发
$ npm run dev

// 打包
$ npm run build
```

## 技术栈

- react@15.3.1
- react-router@3.0.5
- redux@3.6.0
- webpack@1.13.2
- es6

## 浏览器兼容

- Chrome
- Firefox
- Safari
- IE10+

## 日志更新

[Log](https://github.com/cobish/cobish.github.io/releases)
