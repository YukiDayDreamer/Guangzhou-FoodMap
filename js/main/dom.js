/**
 * @param {summaryDOM} HTML for summary
 */

var DOM = function (rows) {
    this.rows = rows;
    this.num = this.rows.length;
    this.listUnit = '<div data-index="" class="summary"><div class="ui very relaxed grid"><div class="summaryLeft six wide column"><span class="helper"></span><img class="summaryThumbnail" src="" alt="Image Unavaliable"></div><div class="summaryRight ten wide column"><div class="summaryName"></div><div class="summaryCaption"></div></div></div></div>';
    this.summaryUnit = '<div class="pane"><div data-index="" class="summary"><div class="ui very relaxed grid"><div class="summaryLeft six wide column"><span class="helper"></span><img class="summaryThumbnail" src="" alt="Image Unavaliable"></div><div class="summaryRight ten wide column"><div class="summaryName"></div><div class="summaryCaption"></div></div></div></div></div>';
    this.detailsUnit = '<p>';
    // init functions
    this.attachSummary();
};

DOM.prototype = {
    attachSummary: function () {
        // assemble DOM text
        var summaryHTML = new String();
        var listHTML = new String();
        var unit = new String();
        for (var index = 0; index < this.num; index++) {
            unit = '<div data-index="' + index + '" class="summaryItem">' +
                    '<div class="ui grid">' +
                    '<div class="summaryLeft six wide column">' +
//                    '<span class="helper"></span>' +
                    this.rows[index].thumbnail + '</div>' +
                    '<div class="summaryRight ten wide column">' +
                    '<div class="name">' + this.rows[index].name + '</div>' +
                    '<span>推荐度 </span><div class="recommendation ui large star rating" data-rating="' + this.rows[index].recommendation + '" data-max-rating="5"></div><br/>' +
                    '<span>吃撑度 </span><div class="full ui heart rating" data-rating="' + this.rows[index].full + '" data-max-rating="5"></div><br/>' +
                    '<div class="labels"><i class="tags icon"></i>' + this.rows[index].label + '</div>' +
                    '<div class="price"><i class="yen icon"></i>' + this.rows[index].price + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            listHTML += unit;
            summaryHTML += '<div class="pane">' + unit + '</div>';
        }
        // attach to DOM tree
        $('#listContainer').html(listHTML);
        $('#summaryContainer>#summaryPanes').html(summaryHTML);
        
        // format summary item
        $('.ui.grid').width('100%');
        
        // format thumbnail 
        $('.summaryLeft>img').addClass('thumbnail');
//        $('.thumbnail').width(80);
//        $('.thumbnail').height(80);
//        $('.thumbnail').css('margin-top', 10);
//        $('.thumbnail').css('margin-left', 20);
        $('.thumbnail').removeAttr('width');
        $('.thumbnail').removeAttr('height');

        // rating
        $('.recommendation').rating('disable');
        $('.full').rating('disable');
    }


};
