import React, { Component } from 'react';
import { CONFIG } from '../constants/Config.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addBaiduAnaly = this.addBaiduAnaly.bind(this);
    this.addDuoshuoComment = this.addDuoshuoComment.bind(this);
  }

  componentWillMount() {
    document.title = CONFIG.title;

    // 添加百度统计
    this.addBaiduAnaly();

    // 添加多说评论框
    this.addDuoshuoComment();
  }

  addBaiduAnaly() {
    if (document.domain.indexOf('github.io') > -1) {
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement('script');
        hm.src = '//hm.baidu.com/hm.js?' + CONFIG['baiduAnaly'];
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
  }

  addDuoshuoComment() {
    window.duoshuoQuery = { short_name: CONFIG.duoshuo };
    (function() {
      var ds = document.createElement('script');
      ds.type = 'text/javascript';
      ds.async = true;
      ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
      ds.charset = 'UTF-8';
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
  }

  render() {
    return (
      <div>
        <div id="logo">
          <a href="#/">cobish.github.io</a>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
};