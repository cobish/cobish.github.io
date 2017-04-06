import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import { CONFIG } from '../constants/Config.js';

export default class Article extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);

    // 代码高亮
    marked.setOptions({
      highlight: code => {
        return hljs.highlightAuto(code).value;
      }
    });

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let url = `https://github.com/cobish/cobish.github.io/issues/${this.props.number}`;
    window.location.href = url;
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
          <button className="article-comment" onClick={this.handleClick}>点击评论</button>
        </div>
      </div>
    );
  }
};