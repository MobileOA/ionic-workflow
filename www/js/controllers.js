angular.module('starter.controllers', [])

    .controller('HomeCtrl', function($scope, $state, AllRequestStatus) {
      $scope.allRequestStatus = AllRequestStatus.allRequestStatus();
      $scope.newRequest = function(){
        $state.go('tab.request-detail', {requestId:0});
      }
    })
    .controller('RequestStatusCtrl', function($scope, $stateParams, AllRequestStatus){
      var requestStatusId = $stateParams.requestStatusId
      $scope.requestStatusWithIndex = AllRequestStatus.getRequestStatusWithIndex(requestStatusId)
    })
    .controller('RequestDetailCtrl', function($scope){})
    .controller('SettingsCtrl', function($scope){})