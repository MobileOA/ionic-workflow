angular.module('starter.controllers', [])

    .controller('HomeCtrl', function($scope, $state, AllRequestStatus) {
      $scope.allRequestStatus = AllRequestStatus.allRequestStatus();
      $scope.newRequest = function(){
        $state.go('tab.request-create');
      }
    })
    .controller('RequestStatusCtrl', function($scope, $stateParams, Requests, AllRequestStatus){
        var requestStatusId = $stateParams.requestStatusId;
        $scope.requestStatusWithIndex = AllRequestStatus.getRequestStatusWithIndex(requestStatusId);
        $scope.statusRequests = Requests.getStatusRequests(requestStatusId);

    })

    .controller('RequestCreateCtrl',function($state,$scope, Requests, AllRequestStatus){
        $scope.request = Requests.newRequest();

        var allRequests = Requests.getAllRequests();
        $scope.submitRequest = function(){
            var insertRequest = $scope.request;
            insertRequest.requestId = Requests.getLastRequestId() + 1;
            allRequests.push(insertRequest);
            Requests.setLastRequestId(insertRequest.requestId);

            Requests.saveRequests(allRequests);
            AllRequestStatus.updateRequestStatusCount($scope.request.requestStatusId, Requests.getStatusRequests($scope.request.requestStatusId));
            $state.go('tab.home');
        }
    })

    .controller('RequestDetailCtrl', function($scope,$state,$stateParams, Requests, AllRequestStatus){
        var requestWithIndex = Requests.getRequestWithIndex($stateParams.requestId);
        var allRequests = Requests.getAllRequests();

        $scope.request = requestWithIndex.request;
        $scope.index = requestWithIndex.index;

        $scope.processRequest = function(action){

            var preRequestStatusId = $scope.request.requestStatusId;
            if (action == 'approve') {
                $scope.request.requestStatusId = 1;
            }else{
                $scope.request.requestStatusId = 2;
            }

            allRequests[$scope.index] = $scope.request;

            Requests.saveRequests(allRequests);
            AllRequestStatus.updateRequestStatusCount($scope.request.requestStatusId, Requests.getStatusRequests(preRequestStatusId));
            AllRequestStatus.updateRequestStatusCount($scope.request.requestStatusId, Requests.getStatusRequests($scope.request.requestStatusId));
            $state.go('tab.home');
        }
    })
    .controller('SettingsCtrl', function($scope){})
    .controller('AccountCtrl', function($scope){});