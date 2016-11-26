function mapReady() {}

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var geocoder = new google.maps.Geocoder()

  // geocode(geocoder, 'Pikku Satamakatu 3-5, helsinki')
  // geocode(geocoder, destination)

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 60.1656706, lng: 24.9650129},
    styles: [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels","stylers":[{"visibility":"off"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","stylers":[{"visibility":"off"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#8DB0FF"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}]
  });
  directionsDisplay.setMap(map);

  calculateAndDisplayRoute(directionsService, directionsDisplay);
}


var testLocations = []
function geocode(geocoder, address) {
  geocoder.geocode({ 'address': address }, function (response, status) {
      console.log(response);
    if (status == google.maps.GeocoderStatus.OK) {
      testLocations.push(response[0])
      if (testLocations.length === 2) {
        var test = google.maps.geometry.spherical.computeDistanceBetween(testLocations[0].geometry.location, testLocations[1].geometry.location)
        console.log(test);
      }
    }
  })
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: 'Pikku Satamakatu 3-5, helsinki',
    waypoints: [{ location: 'kanavakatu 3, helsinki' }, { location: 'Pohjoisesplanadi 39, helsinki' }],
    destination: destination,
    travelMode: 'WALKING'
  }, function(response, status) {
    console.log(response);
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

var destination
function addDestination() {
  destination = document.getElementById('destination').value
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
