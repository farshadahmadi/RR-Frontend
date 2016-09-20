'use strict'

/* Controllers */

function DeviceCtrl($scope, $http, Notification, devs) {

  $scope.devices = devs;

  $scope.shutDownDevice = function(device, index){

    $http({method: 'DELETE', url: '/api/pipe/' + device.url})
      .then(function(data) {
        $scope.devices[index].status = "OFF";
      })
      .catch(function(e) {
        if(e.status == 500){
          $scope.devices[index].status = "OFF";
        } else {
          Notification.error(e.data);
        }
      });
  };
}
