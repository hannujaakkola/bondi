var directionsService
var directionsDisplay
var busRouteDisplay
var stopLocations = []
var destination
var destinationLocation
var map
var mapTitle

function addDestination() {
  destination = document.getElementById('destination').value + ', helsinki'
}

function mapReady() {
  stopLocations = [
    new google.maps.LatLng(60.166948, 24.962423),
    new google.maps.LatLng(60.167551, 24.960503),
    new google.maps.LatLng(60.168165, 24.958625),
    new google.maps.LatLng(60.168516, 24.957427),
    new google.maps.LatLng(60.168932, 24.956864),
    new google.maps.LatLng(60.169165, 24.956416),
    new google.maps.LatLng(60.169121, 24.954517),
    new google.maps.LatLng(60.169138, 24.952908),
    new google.maps.LatLng(60.169103, 24.951580),
    new google.maps.LatLng(60.169006, 24.950132),
    new google.maps.LatLng(60.168985, 24.948665),
    new google.maps.LatLng(60.168933, 24.946562),
    new google.maps.LatLng(60.168894, 24.944539),
    new google.maps.LatLng(60.168752, 24.941609),
  ]
}

function initMap() {
  var directionPolylineOptions = new google.maps.Polyline({
    strokeColor: '#3DD3A1',
  });

  var busPolylineOptions = new google.maps.Polyline({
    strokeColor: '#000',
    strokeOpacity: .25,
    strokeWeight: 5
  });

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true });
  busRouteDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true, polylineOptions: busPolylineOptions });
  var geocoder = new google.maps.Geocoder()

  geocode(geocoder, destination)

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 60.1656706, lng: 24.9650129},
    styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#8DB0FF"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]
  });
  busRouteDisplay.setMap(map);
  directionsDisplay.setMap(map);

  mapTitle = document.getElementById('map-title')

  google.maps.event.addListener(map, "click", function (e) {
    destinationLocation = e.latLng

    var stop = calculateStop(destinationLocation)
    calculateAndDisplayBusRoute();
    calculateAndDisplayRoute(stop);
});

}

function calculateStop(endLocation) {
  var shortestDistance
  var stop
  stopLocations.map(function(stopLocation) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(endLocation, stopLocation)

    if (!shortestDistance || distance < shortestDistance) {
      shortestDistance = distance
      stop = stopLocation
    }
  })

  return stop
}

function geocode(geocoder, address) {
  geocoder.geocode({ 'address': address }, function (response, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      destinationLocation = response[0].geometry.location
      var stop = calculateStop(response[0].geometry.location)

      calculateAndDisplayRoute(stop);
    }
  })
}

function calculateAndDisplayBusRoute() {
  directionsService.route({
    origin: new google.maps.LatLng(60.165918, 24.975119),
    destination: stopLocations[stopLocations.length-1],
    travelMode: 'DRIVING',
  }, function(response, status) {
    if (status === 'OK') {
      busRouteDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function calculateAndDisplayRoute(stop) {
  var origin = new google.maps.LatLng(60.165873, 24.966461)
  var startStop = new google.maps.LatLng(60.165622, 24.966118)
  directionsService.route({
    origin: origin,
    waypoints: [{ location: startStop }, { location: stop }],
    destination: destinationLocation,
    travelMode: 'WALKING',
  }, function(response, status) {
    if (status === 'OK') {
      mapTitle.innerHTML = 'Walk to the first stop'
      directionsDisplay.setDirections(response);

      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = []
      addMarker(origin, 'images/MapView_LocationPointer_supersmall.png')
      addMarker(destinationLocation, {
        url: 'images/RouteFlag_supersmall.png',
        anchor: new google.maps.Point(-1, 28),
      })
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

var markers = []
function addMarker(position, icon) {
  markers.push(new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
  }));
}

App.controller('home', function (page) {
  // put stuff here
});

App.controller('page2', function (page) {
  // put stuff here
});

App.controller('map', function (page) {
  setTimeout(initMap, 0) //wait for #map render
});

// try {
  // App.restore();
// } catch (err) {
  App.load('home');
// }
