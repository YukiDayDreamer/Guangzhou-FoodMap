var Map = function (data) {
    this.data = data;
    this.basemap;
    this.activeMarker;
    this.markers = new Array();
    // big and small icon
    this.iconSmall = {
        url: './img/ready.png',
        size: new google.maps.Size(256, 256),
        scaledSize: new google.maps.Size(24, 24),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(12, 12)
    };
    this.iconBig = {
        url: './img/start.png',
        size: new google.maps.Size(256, 256),
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
    };

    this.initMap();
    this.plotMarkers(this.data);
};

Map.prototype = {
    initMap: function () {
        // map types
        var mapTypes = ["roadmap"];
        // main map
        this.basemap = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: {lat: 23.115, lng: 113.245},
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                mapTypeIds: mapTypes
            }
        });
    },
    plotMarkers: function (data) {
        // ref pointer from outside object -- Map
        var that = this;

        for (var i = 0; i < data.length; i++) {

            // init marker
            var marker = new google.maps.Marker({
                map: this.basemap,
                position: {"lat": data[i].lat, "lng": data[i].lng},
                icon: this.iconSmall,
                dataIndex: i,
                zIndex: 1
            });

//            // marker event handler
//            marker.addListener('click', function () {
//                // Activate Marker Switch
//                that.switchMarker(this, 'yes');
//            });

            this.markers.push(marker);
        }

        // init first marker
        this.switchMarker(this.markers[0]);
    },
    /**
     * public event of switch marker
     * @param {object} marker
     */
    switchMarker: function (marker) {
        // init first one 
        if (typeof this.activeMarker !== "undefined") {
            // remove active marker to old style
            this.activeMarker.setIcon(this.iconSmall);  // back to small icon
            this.activeMarker.setZIndex(1);  // back to inner layer
        }

        // activate new marker
        marker.setIcon(this.iconBig);  // change to big icon
        marker.setZIndex(100);  // change to top

        this.activeMarker = marker;  // update pointer 

        return this.activeMarker.dataIndex;
//        if (typeof switchFlag !== "undefined") {
//            this.switchSlide(this.activeMarker.dataIndex);
//            this.switchDetails(this.activeMarker.dataIndex);
//            this.switchList(this.activeMarker.dataIndex);
//        }
    },
    setCenter: function (index) {
        this.activeMarker = this.markers[index];
        var pos = this.activeMarker.position;
        this.basemap.setCenter({lat: pos.lat(), lng: pos.lng()});
        if (this.basemap.getZoom() < 17) {
            this.basemap.setZoom(17);
        }
    }
    
};
