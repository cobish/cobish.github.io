(function() {
    'use strict';

    /**
     * 初始化
     */
    function init() {
        setRouter();
        sliceTime();
        addBaiduAnaly();

        window.ISSUES = window.ISSUES || null;
    }

    /**
     * 设置路由
     */
    function setRouter() {
        var routes = {
            '/': showIndex,
            'all': showAll,
            'archive': showArchive,
            'tags': showTags,
            'post/:postId': showArticle
        };
        var router = Router(routes);
        router.init('/');
    }

    /**
     * 动态获取issue
     */
    function ajaxGetIssues(cb) {
        $.ajax({
            url: 'https://api.github.com/repos/' + CONFIG['owner'] + '/' + CONFIG['repo'] + '/issues',
            data: {
                filter: 'created',
                per_page: 10000,
                access_token: CONFIG['access_token']
            },
            beforeSend: function() {
                $('#container').html('');
                NProgress.start();
            },
            success: function(json) {
                var data = {
                    list: json
                };

                window.ISSUES = data;
                cb && cb();

                NProgress.done();
            }
        });
    }

    /**
     * 动态获取文章
     */
    function ajaxGetPost(id, cb) {
        $.ajax({
            url: 'https://api.github.com/repos/' + CONFIG['owner'] + '/' + CONFIG['repo'] + '/issues/' + id,
            data:{
                access_token: CONFIG['access_token']
            },
            beforeSend: function() {
                NProgress.start();
            },
            success: function(json) {
                cb && cb(json);
                NProgress.done();
            }
        });
    }

    /**
     * 显示全部文章
     */
    function showIndex() {
        NProgress.start();
        $('#container').html($('#index').html());
        NProgress.done();
    }

    /**
     * 显示全部文章
     */
    function showAll() {
        if (window.ISSUES) {
            NProgress.start();
            showAllTemplate();
            NProgress.done();
            return;
        }

        ajaxGetIssues(showAllTemplate);
    }

    /**
     * 渲染全部文章
     */
    function showAllTemplate() {
        var html = template('all', window.ISSUES);
        $('#container').html(html);
    }

    /**
     * 显示归档
     */
    function showArchive() {
        if (window.ISSUES) {
            NProgress.start();
            showArchiveTemplate();
            NProgress.done();
            return;
        }

        ajaxGetIssues(showArchiveTemplate);
    }

    /**
     * 渲染归档文章
     */
    function showArchiveTemplate() {
        var list = window.ISSUES.list;
        var year = 0;
        var articles = [];
        var index = 0;
        for (var i = 0; i < list.length; i++) {
            var time = parseInt(list[i]['created_at'].substring(0, 4));

            if (time !== year) {
                articles[index] = {};
                articles[index][time] = [];
                index += 1;
                year = time;
            }

            articles[index-1][time].push(list[i]);
        }

        var data = {
            list: articles
        };

        var html = template('archive', data);
        $('#container').html(html);
    }

    /**
     * 显示分类
     */
    function showTags() {
        if (window.ISSUES) {
            NProgress.start();
            showTagsTemplate();
            NProgress.done();
            return;
        }

        ajaxGetIssues(showTagsTemplate);
    }

    /**
     * 渲染分类文章
     */
    function showTagsTemplate() {
        var list = window.ISSUES.list;
        var articles = {};

        for (var i = 0; i < list.length; i++) {
            var labels = list[i]['labels'];
            for (var j = 0; j < labels.length; j++) {
                var name = labels[j]['name'];
                if (!articles.hasOwnProperty(name)) {
                    articles[name] = [];
                }

                articles[name].push(list[i]);
            }
        }

        var data = {
            list: articles
        };

        var html = template('tags', data);
        $('#container').html(html);
    }

    /**
     * 显示文章内容
     */
    function showArticle(id) {
        if (window.ISSUES) {
            for (var i = 0; i < window.ISSUES.list.length; i++) {
                if (parseInt(window.ISSUES.list[i].number) === parseInt(id)) {
                    NProgress.start();
                    showArticleTemplate(window.ISSUES.list[i]);
                    NProgress.done();
                    break;
                }
            }
            return;
        }

        ajaxGetPost(id, showArticleTemplate);
    }

    function showArticleTemplate(post) {
        var html = template('post', post);
        $(document).scrollTop(0);
        $('#container').html(html);
        $('#article').html(marked(post.body));
        // addVisits(post.number);
        highlight();
        toggleDuoshuoComments('#ds', post.number);
    }

    /**
     * 代码高亮
     */
    function highlight(){
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    }

    /**
     * 切割时间字符串
     */
    function sliceTime() {
        template.helper('slice', function(time, length) {
            return time.substring(0, length);
        });

        template.helper('markdown2HTML', function(markdown) {
            return marked(markdown);
        });
    }

    /**
     * 添加多说评论框
     */
     function toggleDuoshuoComments(container, id){
         var el = document.createElement('div');
         var url = window.location.href;
         el.setAttribute('data-thread-key', id);
         el.setAttribute('data-url', url);
         DUOSHUO.EmbedThread(el);
         jQuery(container).append(el);
     }

    /**
     * 添加百度统计
     */
    function addBaiduAnaly() {
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

    init();

})();
