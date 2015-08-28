angular.module('starter.controllers', [])

    .controller('HomeCtrl', function($scope, $state, AllRequestStatus) {
      $scope.allRequestStatus = AllRequestStatus.allRequestStatus();
      $scope.newRequest = function(){
        $state.go('tab.request-detail', {requestId:0});
      }
    })
    .controller('RequestStatusCtrl', function($scope, $stateParams, Requests, AllRequestStatus){
        var requestStatusId = $stateParams.requestStatusId;
        $scope.requestStatusWithIndex = AllRequestStatus.getRequestStatusWithIndex(requestStatusId);
        $scope.statusRequests = Requests.getStatusRequests(requestStatusId);

    })
    .controller('RequestDetailCtrl', function($scope,$state,$stateParams, Requests, AllRequestStatus){
        $scope.isNew = true;
        $scope.title = "New Request";

        var requestId = $stateParams.requestId;

        var allRequests = Requests.getAllRequests();

        if (requestId > 0) {
            $scope.isNew = false;
            $scope.title = "Request Detail";

            var requestWithIndex = Requests.getRequestWithIndex($stateParams.requestId);
            $scope.request = requestWithIndex.request;
            $scope.index = requestWithIndex.index;

        } else {
            $scope.request = Requests.newRequest();
        }

        $scope.submitRequest = function(){

            if (requestId > 0) {

            } else {
                var insertRequest = $scope.request;
                insertRequest.requestId = Requests.getLastRequestId() + 1;
                allRequests.push(insertRequest);
                Requests.setLastRequestId(insertRequest.requestId);
            }

            Requests.saveRequests(allRequests);
            AllRequestStatus.updateRequestStatusCount($scope.request.requestStatusId, Requests.getStatusRequests($scope.request.requestStatusId));
            //$state.go('tab.request-status', {requestStatusId: $scope.request.requestStatusId});
            $state.go('tab.home');
        }
    })
    .controller('SettingsCtrl', function($scope){})
    .controller('AccountCtrl', function($scope){});