import React, { Component } from 'react';
import marked from 'marked';
import $ from 'jquery';
import hljs from 'highlight.js';

export default class Article extends Component {

  componentDidMount() {
    // 渲染 Markdown
    this.refs['article'].innerHTML = marked(this.props.body);

    // 代码高亮
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
  }

  render() {
    return (
      <div>
        <div className="article">
          <h1 className="article-title">{this.props.title}</h1>
          <p className="article-time">{this.props.created_at.substr(0, 10)}</p>
          <div ref="article" className="article-desc article-content"></div>
        </div>
        <div id="ds" className="article"></div>
      </div>
    );
  }
};