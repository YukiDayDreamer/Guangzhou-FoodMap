// main map
function initMap() {
    var mapTypes = ["roadmap"];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: {lat: 23.13, lng: 113.38},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: mapTypes
        }
    });
    marker = new google.maps.Marker({
        map: map,
        draggable: true
    });

    google.maps.event.addListener(map, 'click', function (event) {
        marker.setPosition(event.latLng);
    });

    $('#map').height(350);
}


// Read Specific Item
function readItem(id) {
    $.ajax({
        type: 'POST',
        url: './php/admin/read.php',
        data: {id: id}
    }).done(function (data) {
//        console.log(data);
        var result = eval(data);
        item = result[0];
        if (item === false) {
            layer.msg('此ID不存在', {icon: 2});
        } else {
            // another way beside parseInt and parseFloat
            itemID = item.id - 0;
            item.lat = item.lat - 0;
            item.lng = item.lng - 0;
            item.pathOnly = item.pathOnly - 0;
            fill(item);  // fill the form
        }
    });
}


// Fill form with item info
function fill(item) {
    // indicator
    $('#currentID').html(item.id);
    $('#query').val(item.id);
    // form
    $('#path').dropdown('set value', item.path);
    $('#pathID').val(item.pathID);
    $('#pathOnly').checkbox(item.pathOnly === 1 ? 'check' : 'uncheck');
    $('#price').val(item.price);
    $('#name').val(item.name);
    $('#label').val(item.label);
    $('#recommendation').rating('set rating', item.recommendation);
    $('#full').rating('set rating', item.full);
    map.setCenter({lat: item.lat, lng: item.lng});
    marker.setPosition({lat: item.lat, lng: item.lng});
    thumbnail.html(item.thumbnail);
    editor.html(item.description);
}


// Clear data and form 
function clear() {
    // clear data
    item = {};
    itemID = null;
    // clear indicator
    $('#currentID').html('');
    $('#query').val('');
    // clear form
    $('#path').dropdown('set value', '0');
    $('#pathID').val('');
    $('#pathOnly').checkbox('uncheck');
    $('#price').val('');
    $('#name').val('');
    $('#label').val('');
    $('#recommendation').rating('set rating', '3');
    $('#full').rating('set rating', '3');
//    map.setCenter();
    marker.setPosition();
    thumbnail.html('');
    editor.html('');
}


// Collect info from form filling
function collect(item, id) {
    if (typeof id === 'undefined') {
        item.id = null;
    } else {
        item.id = id;
    }
    item.path = $('#path').val();
    item.pathID = $('#pathID').val();
    item.pathOnly = $('#pathOnly').checkbox('is checked') + 0;
    item.price = $('#price').val();
    item.name = $('#name').val();
    item.label = $('#label').val();
    item.recommendation = $('#recommendation').rating('get rating');
    item.full = $('#full').rating('get rating');
    item.lat = marker.getPosition().lat();
    item.lng = marker.getPosition().lng();
    item.thumbnail = thumbnail.html();
    item.description = editor.html();   
}


// Add eventlistener to dom
function initEvent() {
    // Search or Jump to Specific Item
    $('#search').click(function () {
        if (isNaN(parseInt($('#query').val()))) {
            layer.tips('请输入一个ID', '#query', {
                tips: [1, '#da9b3d'],
                time: 4000,
                tipsMore: true
            });
            console.warn("You should type a number in the search box.");
        } else {
            readItem(parseInt($('#query').val()));
        }
    });

    // Read Previous and Next
    $('#previous').click(function () {
        readItem(itemID - 1);
    });
    $('#next').click(function () {
        readItem(itemID + 1);
    });
    
//    document.onkeydown = (function () {
//        if (event.keyCode === 37)//左 
//            readItem(itemID - 1);
//        if (event.keyCode === 39)//右 
//            readItem(itemID + 1);
//    });

    // clear form
    $('#clear').click(function () {
        clear();  // clear data and form
        $.ajax({
            type: 'POST',
            url: './php/admin/getMaxID.php'
        }).done(function (data) {
            var result = eval(data);
            itemID = result - 0 + 1;  // next ID 
            $('#currentID').html(itemID);
        });
    });

    // Update Item
    $('#update').click(function () {
        collect(item, itemID);  // collect data from form
        // create item
        $.ajax({
            type: 'POST',
            url: './php/admin/update.php',
            data: {json: JSON.stringify(item)}
        }).done(function (data) {
            layer.msg('更新成功', {icon: 1});  // prompt for success 
//            console.log(data);
        });
    });

    // Create New Item
    $('#create').click(function () {
        collect(item);  // collect data from form
        // create item
        $.ajax({
            type: 'POST',
            url: './php/admin/create.php',
            data: {json: JSON.stringify(item)}
        }).done(function (data) {
            layer.msg('新增成功', {icon: 1});  // prompt for success 
//            console.log(data);
        });
    });
}
