var myApp = angular.module('onVaOu', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: '/home.html'
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