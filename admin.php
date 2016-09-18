<!DOCTYPE html> 
<html>
    <head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta charset="utf-8">
        <title>广州美食地图后台管理</title>
        <!-- Style Sheet -->
        <link rel="stylesheet" type="text/css" href="//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="//cdn.bootcss.com/semantic-ui/2.1.8/semantic.min.css">
        <!--<link rel="stylesheet" type="text/css" href="css/style.css">-->

        <!-- Scripts -->
        <!-- Third Party Libs -->
        <!-- jQuery -->
        <script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.0.min.js"></script>
        <!--Bootstrap 核心 JavaScript 文件--> 
        <script src="//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <!-- Semantic UI -->
        <script src="//cdn.bootcss.com/semantic-ui/2.1.8/semantic.min.js"></script>
        <!-- Google Maps -->
        <script 
            src="http://maps.google.cn/maps/api/js?key=AIzaSyAO9lTKIiNT6vVJiAnNZ-JiGyMDgbPeZfA&signed_in=false&libraries=visualization,places">
        </script>
        <!-- d3 -->
        <script src="//cdn.bootcss.com/d3/4.1.0/d3.js" charset="utf-8"></script>
        <!-- Kind Editor -->
        <script src="./js/lib/kindeditor/kindeditor-all-min.js"></script>
        <!-- Layer -->
        <script src="./js/lib/layer/layer/layer.js"></script>

        <!-- Custom Scripts -->
        <script src="./js/admin/admin.js"></script>

    </head>
    <body>
        <!--<div id="test" class="ui heart rating"></div>-->
        <div class="ui menu">
            <a id="previous" class="item">
                上一个
            </a>
            <div class="item">
                <div>当前ID: </div><div id="currentID" style="color: red;"></div>
            </div>
            <a id="next" class="item">
                下一个
            </a>
            <div class="item">
                <div class="ui icon input">
                    <input id="query" type="text" placeholder="Search ID...">
                    <i id="search" class="search link icon"></i>
                </div>
            </div>
            <!--            <div class="item">
                            <div id="jump" class="ui green button">跳转</div>
                        </div>-->
            <div class="item">
                <div id="update" class="ui orange button">更新</div>
            </div>
            <div class="right menu">
                <div class="item">
                    <div id="clear" class="ui brown button">新建项目</div>
                </div>
                <div class="item">
                    <div id="create" class="ui blue button">提交新项目</div>
                </div>
            </div>
        </div>

        <div class="ui grid segment">
            <!--Left-->
            <div class="ui eight wide column">
<!--                <table class="ui celled table">
                    <thead>
                        <tr class="center aligned">
                            <th class="six wide">路线</th>
                            <th class="four wide">路线ID</th>
                            <th class="four wide">大地图不可见?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="center aligned">
                            <td>
                                <select id="path" class="ui search dropdown">
                                    <option value="0">无</option>
                                    <option value="多宝路-宝华路">多宝路-宝华路</option>
                                </select>
                            </td>
                            <td>
                                <div id="pathOnly" class="ui checkbox">
                                    <input type="checkbox" name="pathOnly">
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>-->
                <table class="ui table">
                    <thead>
                    </thead>
                    <tbody>
                        <tr class="center aligned">
                            <td><div class="ui ribbon label">路线</div></td>
                            <td>
                                <select id="path" class="ui search dropdown">
                                    <option value="0">无</option>
                                    <option value="多宝路-宝华路">多宝路-宝华路</option>
                                </select>
                            </td>
                            <td><div class="ui ribbon label">路线ID</div></td>
                            <td><div class="ui input"><input id="pathID" type="text" name="pathID" placeholder="路线内ID"></div></td>
                        </tr>
                        <tr class="center aligned">
                            <td><div class="ui ribbon label">大地图不可见</div></td>
                            <td><div id="pathOnly" class="ui checkbox"><input type="checkbox" name="pathOnly"></div></td>
                            <td><div class="ui ribbon label">人均价</div></td>
                            <td><div class="ui input"><input id="price" type="text" name="label" placeholder="人均价格"></div></td>
                        </tr>
                        <tr class="center aligned">
                            <td><div class="ui ribbon label">名称</div></td>
                            <td><div class="ui input"><input id="name" type="text" name="name" placeholder="名称"></div></td>
                            <td><div class="ui ribbon label">标签</div></td>
                            <td><div class="ui input"><input id="label" type="text" name="label" placeholder="标签, 空格隔开多个标签"></div></td>
                        </tr>
                        <tr class="center aligned">
                            <td><div class="ui ribbon label">推荐度</div></td>
                            <td><div id="recommendation" class="ui huge star rating"></div></td>
                            <td><div class="ui ribbon label">吃撑度</div></td>
                            <td><div id="full" class="ui large heart rating"></div></td>
                        </tr>
                    </tbody>
                </table>
                <!--<div class="ui eight wide column">-->
                <div id="map"></div>
                <!--</div>-->
            </div>
            <!--Right-->
            <div class="ui form eight wide column">
                <div class="field">
                    <textarea id="thumbnail" name="thumbnail"></textarea>
                    <textarea id="description" name="description"></textarea>
                    <p>还可以输入 <span class="word_count" style="color: brown;"></span> 个文字(含HTML代码)</p>
                </div>
            </div>
        </div>

        <!-- Initialize -->
        <script>
                var item = {};
                var itemID, map, marker;

                $(document).ready(function () {
                    initMap();  // init map
                    initEvent();  // init event

                    // init semantic UI 
                    $('#recommendation').rating({
                        initialRating: 3,
                        maxRating: 5,
                        clearable: true
                    });
                    $('#full').rating({
                        initialRating: 3,
                        maxRating: 5,
                        clearable: true
                    });
                    $('.ui.dropdown').dropdown();   // id: path
                    $('.ui.checkbox').checkbox();   // id: pathOnly

                    // init thumbnail
                    KindEditor.ready(function (K) {
                        window.thumbnail = K.create('#thumbnail', {
                            resizeType: 1,
                            allowPreviewEmoticons: false,
                            items: ['image'],
                            width: '100%',
                        });
                    });

                    // init editor 
                    KindEditor.ready(function (K) {
                        window.editor = K.create('#description', {
                            width: '100%',
                            height: '400px',
                            afterChange: function () {
                                // max words is 4999
                                K('.word_count').html(4999 - this.count());
                            }
                        });
                    });

                });
        </script>
    </body>
</html>
