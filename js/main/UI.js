/**
 * handle UI layout
 */

/**
 * display different pages based on 
 * @param {document element of page} page
 * @returns {undefined}
 */
function displayPage(page) {
    var pages = document.getElementsByClassName("page");
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
    }
    page.style.display = "block";
}

var UI = function () {
    this.init();
    this.adjust();
};

UI.prototype = {
    init: function () {

        // init dropdown 
        $('#menu-areas').dropdown();

//        // init tap event for switching menu pages
//        var eventPageList = new Hammer(document.getElementById("menu-list"));
//        eventPageList.on('tap', function (event) {
//            displayPage(document.getElementById("pageList"));
//            // addtional event handle
//            eventHandler.list.switchItem(eventHandler.list.activeIndex);
//        });
//
//
//        var eventPageMap = new Hammer(document.getElementById("menu-map"));
//        eventPageMap.on('tap', function (event) {
//            displayPage(document.getElementById("pageMap"));
//        });
//
//        var eventPageDetails = new Hammer(document.getElementById("menu-details"));
//        eventPageDetails.on('tap', function (event) {
//            displayPage(document.getElementById("pageDetails"));
//            // addtional event handlers
////            eventHandler.details = new Details();
//        });
    },
    adjust: function () {
        // adjust offset of page
        var topHeight = $('#menu').height();
        
        // ajust content position relative to menu
        $('.page').css('position', 'relative');  
        $('.page').css('top', topHeight);

        // adjust heights
        var heigthSummary = 110;  // fixed height of carousel
        var heightMap = window.innerHeight - $('#menu').height() - heigthSummary;
        var heightDetails = window.innerHeight - $('#menu').height();
        $('#map').height(heightMap);
        $('#summaryPanes').height(heigthSummary);
        $('#detailsPanes').height(heightDetails);


//        // page map and summary
//        /*  prevent default overscrolling */
//        document.getElementById('listContainer').addEventListener('touchstart', function (e) {
//            e.preventDefault();
//        });
//        document.getElementById('detailsContainer').addEventListener('touchstart', function (e) {
//            e.preventDefault();
//        });
        
//        // page detail
//        $("#pageDetails").css({
//            'overflow-x' : 'hidden',
//            'overflow-y' : 'scroll'
//        });
        
        
//        $('#detailsPanes').css('overflow','scroll');

//        $("#detailsPanes>.pane").css('overflow', 'scroll');
        
        $('.detailsImage>img').css('max-width', window.innerWidth * 1); // width of the image
//        $('#detailsDescription>img').css('max-height', 500);
//        var heightTotal = window.innerHeight - $('#menu').height();
//        var heightMap = heightTotal * 0.7;
//        var heightSummary = heightTotal * 0.3;
//        $('#map').height(heightMap);
//        $('#summary').height(heightSummary);
//        $('#summary').width('100%');

        // clamp text in the summary
//        var names = document.getElementsByClassName('name');
//        var labels = document.getElementsByClassName('labels');

        // num of maximum rows
//        var numRows = parseInt((window.innerHeight - $('.summaryCaption').offset().top) /
//                ($('.summaryCaption').css('line-height').replace('px', '') - 0));

//        for (var i = 0; i < names.length; i++) {
//            $clamp(names[i], {clamp: 1});
//            $clamp(labels[i], {clamp: 1});
//        }


        // page padding
//        $('#pageList').css('padding',10);    
//        $('#pageDetails').css('padding',10);
    }

};