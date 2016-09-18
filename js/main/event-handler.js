var eventHandler = function (rows) {
    // dataset
    data = rows;

    num = rows.length;

    // init activeIndex (current index)
    activeIndex = 0;

    // DOM operation
    dom = new DOM(rows);

    /** listen to size change event **/
    window.addEventListener('resize', function (event) {
        ui.adjust();
    });

    // init list
    list = new List();

    // init map
    map = new Map(rows);

    // init summary
    summary = new Summary(num);

    // init details
    details = new Details(rows);
    
    // init UI
    ui = new UI();


    // init functions
    clickList();
    switchMarker();
    clickSummary();
    menuListener();

    // display map page
    displayPage(document.getElementById("pageMap"));
    document.getElementById('summaryContainer').ontouchmove = function (e) {
        e.preventDefault();  // disable vertical scrolling of summary
    };

//    $('#summaryContainer').on('touchstart', function (event) {
//        $('#summaryContainer').css('overflow-x','hidden');
//        $('#summaryContainer').css('overflow-y','hidden');  
//    });
//    $('#menu-map').click();

//    console.log(rows);
};

function clickList() {
    $('#listContainer>.summaryItem').on('click', function (event) {
        activeIndex = parseInt(this.getAttribute('data-index'));
        $('#menu-details').click();
//        displayPage(document.getElementById("pageDetails"));
//        details.initDOM(activeIndex);
//        map.setCenter(activeIndex);
    });
}

/** could not use closure in this function 
 *  since index will remain in the cache
 *  it will ruin the array for out of index 
 */
function switchMarker() {
    for (var index = 0; index < map.markers.length; index++) {
        map.markers[index].addListener('click', function (event) {
            // return active index
            activeIndex = map.switchMarker(this);
            summary.slider.show(activeIndex);  // summary changed
        });
    }
}

function clickSummary() {
    $('#summaryContainer').on('click', function (event) {
        $('#menu-details').click();
//        displayPage(document.getElementById("pageDetails"));
//        details.initDOM(activeIndex);
//        map.setCenter(activeIndex);
    });
}

function switchSummary(index) {
    map.switchMarker(map.markers[index]); // map
    map.setCenter(activeIndex);
}

// might not be useful
function switchDetails(index) {
    map.switchMarker(map.markers[index]); // map
    map.setCenter(activeIndex);
}

function menuListener() {
    // init tap event for switching menu pages
    $('#menu-list').click(function (event) {
        /* ui setting */
        $('.dropdown.button').removeClass('active');
        $('#menu-list').addClass('active');
        /* ui setting end */
        displayPage(document.getElementById("pageList"));
        list.switchItem(activeIndex);
    });

    $('#menu-map').click(function (event) {
        /* ui setting */
        $('.dropdown.button').removeClass('active');
        $('#menu-map').addClass('active');
        /* ui setting end */
        displayPage(document.getElementById("pageMap"));
//        $('#map').css('display','block');

        // try to conquer the upper left problem
        google.maps.event.trigger(map.basemap, 'resize');

        map.switchMarker(map.markers[activeIndex]);
        map.setCenter(activeIndex);
        summary.slider.show(activeIndex);
    });

    $('#menu-details').click(function (event) {
        /* ui setting */
        $('.dropdown.button').removeClass('active');
        $('#menu-details').addClass('active');
        /* ui setting end */
        displayPage(document.getElementById("pageDetails"));
        details.initDOM(activeIndex);
    });
}


