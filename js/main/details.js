/**
 * handle pan of slider
 */


var Details = function (rows) {
    this.rows = rows;
    this.initDOM();
    this.initHammer();
};

Details.prototype = {
    // process events of swipe left and right
    initHammer: function () {
        var that = this;  // ref pointer
        var hammertime = new Hammer(document.querySelector("#detailsContainer"));
        hammertime.on('swiperight', function (ev) {
            if (activeIndex === 0) {
                layer.msg('入侵秘境失败...', {icon: 4, time: 2000});  // prompt for warning 
            } else {
                // dimmer
                $('#loadingScreen').addClass("active");
                $('#loadingScreen').addClass("dimmer");
                $('#loadingText').text(loadingText());
                // data processing
                activeIndex -= 1;
                that.initDOM(activeIndex);
                // dimmer
                $('#loadingScreen').removeClass("active");
                $('#loadingScreen').removeClass("dimmer");
            }
        });
        hammertime.on('swipeleft', function (ev) {
            if (activeIndex === num - 1) {
                layer.msg('入侵秘境失败...', {icon: 4, time: 2000});  // prompt for warning  
            } else {
                // dimmer
                $('#loadingScreen').addClass("active");
                $('#loadingScreen').addClass("dimmer");
                $('#loadingText').text(loadingText());
                // data processing
                activeIndex += 1;
                that.initDOM(activeIndex);
                // dimmer
                $('#loadingScreen').removeClass("active");
                $('#loadingScreen').removeClass("dimmer");
            }
        });
    },
    initDOM: function (index) {
        if (typeof index === "undefined") {
            index = activeIndex;
        }

        var detailsHTML = '<div data-index="' + index + '" class="detailsItem">' +
                '<div data-index="' + index + '" class="summaryItem">' +
                '<div class="ui grid">' +
                '<div class="summaryLeft six wide column">' +
//                    '<span class="helper"></span>' +
                this.rows[index].thumbnail + 
                        '</div>' +
                '<div class="summaryRight ten wide column">' +
                '<div class="name">' + this.rows[index].name + '</div>' +
                '<span>推荐度 </span><div class="recommendation ui large star rating" data-rating="' + this.rows[index].recommendation + '" data-max-rating="5"></div><br/>' +
                '<span>吃撑度 </span><div class="full ui heart rating" data-rating="' + this.rows[index].full + '" data-max-rating="5"></div><br/>' +
                '<div class="labels"><i class="tags icon"></i>' + this.rows[index].label + '</div>' +
                '<div class="price"><i class="yen icon"></i>' + this.rows[index].price + '</div>' +
                '</div>' +
                '</div>' +
                '</div>' + '<div class="detailsDescription">' + this.rows[index].description + '</div>' +
                '</div>';

        // attach to DOM tree
        $('#detailsContainer').html(detailsHTML);

        /* ajustment 
         * init summary setting
         * size of img, iframe
         * padding of page
         * 
         * */
        
        // format summary item
        $('.ui.grid').width('100%');

        // format thumbnail 
        $('.summaryLeft>img').addClass('thumbnail');
//        $('.thumbnail').removeAttr('width');
//        $('.thumbnail').removeAttr('height');

        // rating
        $('.recommendation').rating('disable');
        $('.full').rating('disable');

        // img 
        var imgs = $('.detailsDescription').find('img');
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].getAttribute('src');
            if (src.endsWith('.gif')) {
                continue;
            } else {
                imgs[i].style.width = "100%";
                imgs[i].removeAttribute("width");
                imgs[i].removeAttribute("height");
            }
        }

//        // iframe
//        var iframes = $('.detailsDescription>p>iframe');
//        for (var i = 0; i < iframes.length; i++) {
//            iframes[i].style.width = "100%";
//            iframes[i].removeAttribute("width");
//        }

        // padding of description only
        if ($('#pageDetails').css('width') <= 320) {
            $('.detailsDescription').css('padding', '10px');
        } else {
            $('.detailsDescription').css('padding', '15px');
        }
        
        $('.detailsDescription').css({'letter-spacing':'2px'});

        // reset scroll bar
        window.scrollTo(0, 0);

    }
};
