import React, { Component } from 'react';
import marked from 'marked';
import $ from 'jquery';
import hljs from 'highlight.js';
import { CONFIG } from '../constants/Config.js';

export default class Article extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    document.title = this.props.title;
  }

  componentDidMount() {
    // 渲染 Markdown
    this.refs['article'].innerHTML = marked(this.props.body);

    // 代码高亮
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    // 显示多说评论框
    this.toggleDuoshuoComment();
  }

  toggleDuoshuoComment() {
    let ele = this.refs['ds'];
    window.DUOSHUO.EmbedThread(ele);
  }

  render() {
    return (
      <div>
        <div className="article">
          <h1 className="article-title">{this.props.title}</h1>
          <p className="article-time">{this.props.created_at.substr(0, 10)}</p>
          <div ref="article" className="article-desc article-content"></div>
        </div>
        <div className="article">
          <div ref="ds" className="ds-thread" data-thread-key={this.props.number} data-title={this.props.title} data-url={window.location.href}></div>
        </div>
      </div>
    );
  }
};