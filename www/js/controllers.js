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
    .controller('RequestDetailCtrl', function($scope,$stateParams, Requests){
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
            var totalAdd = 0;

            if (requestId > 0) {

            } else {
                var insertRequest = $scope.request;
                insertRequest.status = "Pending for approval";
                insertRequest.requestId = Requests.getLastRequestId() + 1;
                allRequests.push(insertRequest);
                totalAdd = 1;
            };

            Requests.saveRequests(allRequests);
        }
    })
    .controller('SettingsCtrl', function($scope){})
    .controller('AccountCtrl', function($scope){});