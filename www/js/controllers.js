angular.module('starter.controllers', [])

    .controller('HomeCtrl', function($scope, $state, AllRequestStatus) {
      $scope.allRequestStatus = AllRequestStatus.allRequestStatus();
      $scope.newRequest = function(){
        $state.go('tab.request-detail', {requestId:0});
      }
    })
    .controller('RequestStatusCtrl', function($scope, $stateParams, AllRequestStatus){
        var requestStatusId = $stateParams.requestStatusId;
      $scope.requestStatusWithIndex = AllRequestStatus.getRequestStatusWithIndex(requestStatusId)
    })
    .controller('RequestDetailCtrl', function($scope,$stateParams){
        $scope.isNew = true;
        $scope.title = "New Request";

        var requestId = $stateParams.requestId;
        if (requestId > 0) {
            $scope.isNew = false;
            $scope.title = "Request Detail"
        }

        $scope.submitRequest = function(){

        }
    })
    .controller('SettingsCtrl', function($scope){});