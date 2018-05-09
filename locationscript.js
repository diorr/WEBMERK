// create some basic global variables
var map = {};
var markers = [];
var place = [];
var globalPos;

// *************************************************************
// onload event handler to create the initial map and map object
function initMap() {
    // create a container to draw the map (same idea as bing)
    // inside a <div>
    var mapCanvas = (document.getElementById("maparea"));

    // define some map properties (These default to Fanshawe before the map can find the user's location, and then adjust)
    var mapOptions = {
        center: new google.maps.LatLng(43.011987, -81.200276),
        zoom: 12
    }
    // call the constructor to create a new map object
    // and then get your geo location
    map = new google.maps.Map(mapCanvas, mapOptions);
    getLocation();
    loadLocations();
}

// ***********************************************************
// Get and then set the map position based on the geo location
function getLocation() {
    if (navigator.geolocation) {
        // showPosition is a reference to a JS function (below)
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}

// *********************************
// helper function for getLocation()
function showPosition(position) {
    globalPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    //center the map on current position
    map.setCenter(globalPos);
}

// ***************************************************************
// this event handler demonstrates Google Places service
// by requesting all our locations
function loadLocations() {
    // delete any existing markers
    deleteMarkers();
    // create a request object
    // create the service object
    var service = new google.maps.places.PlacesService(map);
    var request = {};
    var query = ['Digital Echidna', 'Core Solutions', 'HRDownloads', 'tbk Creative'];
    query.forEach((item, index)=> {
      request = {
        query: item
      }
      service.textSearch(request, callback);
    })
    // this is an inner callback function as referenced immediately above
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                markersPos.push(results[i].geometry.location.toString());   //this was to capture the locations of the markers for use below
                //Creating the marker
                addMarker(results[i]);
            }
        }
    }
    // display all the pins
    displayAllMarkers(map);
}

// **************************************************************
// function creates a marker object and adds the new marker (pin)
// to the marker array
function addMarker(place) {
    // create a marker (pin) object
    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name + "\n" + place.formatted_address,
        animation: google.maps.Animation.DROP
    });
    // push the marker object onto the markers array
    markers.push(marker);
}

// *********************************************************
// display all the marker objects (pins) in the marker array
function displayAllMarkers(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// *************************************************
// delete all map markers and init the markers array
function deleteMarkers() {
    displayAllMarkers(null);
    markers = [];
    markersPos = [];
}
