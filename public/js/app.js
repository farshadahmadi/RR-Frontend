'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngRoute', 'ui-notification']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'partials/device',
      controller: DeviceCtrl,
      resolve:{
        devs: function($http){

          return $http({method: 'GET', url: '/api/pipe/http://130.230.142.101:3000'})
            .then(function(data){
              
              function testConnection(device){
                return $http({method: 'GET', url: '/api/pipe/' + device.url + '/app'})
                  .then(function(res){
                    return "ON";
                  })
                  .catch(function(e){
                    return "OFF";
                  });
              }

              var devs = data.data.map(function(dev){
                return testConnection(dev);
              });

              return Promise.all(devs).then(function(values){
                for(var i = 0; i < values.length; i++){
                  data.data[i].status = values[i];
                  data.data[i].buttonStatus = true;
                }
                return data.data;
              });
            });
        }
      }
    })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);
