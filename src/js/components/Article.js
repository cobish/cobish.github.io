import React, { Component } from 'react';
import marked from 'marked';
import $ from 'jquery';
import hljs from 'highlight.js';
import { CONFIG } from '../constants/Config.js';

export default class Article extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
    // document.title = this.props.title;

    // 代码高亮
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value;
      }
    });
  }

  componentDidMount() {
    // 显示多说评论框
    this.toggleDuoshuoComment();
  }

  toggleDuoshuoComment() {
    let ele = this.refs['ds'];
    try {
      window.DUOSHUO.EmbedThread(ele);
    } catch(e) {

    }
  }

  render() {
    return (
      <div>
        <div className="article">
          <h1 className="article-title">{this.props.title}</h1>
          <p className="article-time">{this.props.created_at.substr(0, 10)}</p>
          <div className="article-desc article-content"
               dangerouslySetInnerHTML={{__html: marked(this.props.body)}}>
          </div>
        </div>
        <div className="article">
          <div ref="ds" className="ds-thread" data-thread-key={this.props.number} data-title={this.props.title} data-url={window.location.href}></div>
        </div>
      </div>
    );
  }
};