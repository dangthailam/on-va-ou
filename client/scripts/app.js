var myApp = angular.module('onVaOu', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: '/home.html',
    controller: function(){
        var locations = [
            {
                lat: 48.86911867,
                lon: 2.32335091,
                html: [
                    '<h3>Content D2</h3>',
                    '<p>Restaurant promo</p>',
                    '<p>Phone: 0750353191</p>'
                ].join(''),
                title: "1st point",
                icon: 'http://maps.google.com/mapfiles/markerA.png'
            },
            {
                lat: 48.85172663,
                lon: 2.37999916,
                icon: 'http://maps.google.com/mapfiles/markerB.png'
            },
            {
                lat: 48.8418986,
                lon: 2.32506752,
                icon: 'http://maps.google.com/mapfiles/markerC.png'
            }
        ];

        var maplace = new Maplace({
            locations: locations,
            map_options: {
                set_center: [48.856614, 2.3522219],
                zoom: 12
            }
        });

        maplace.Load();

        var request = {
            placeId: 'ChIJCYeFPX5j5kcRbQx3J0A_EBM'
        };

        service = new google.maps.places.PlacesService(maplace.oMap);
        service.getDetails(request, function callback(place, status) {
            console.log(status, place.geometry.location.lat(), place.geometry.location.lng());
            console.log(place);

            var lat = place.geometry.location.lat();
            var lon = place.geometry.location.lng();

            maplace.AddLocation({
                lat: lat,
                lon: lon,
                icon: 'http://maps.google.com/mapfiles/markerD.png'
            }, 0, true);
        });
    }
  };

  var createEventState = {
    name: 'createEvent',
    url: '/create-event',
    templateUrl: '/create-event.html'
  };

  $stateProvider.state(homeState);
  $stateProvider.state(createEventState);
  
  $urlRouterProvider.otherwise('/');
});