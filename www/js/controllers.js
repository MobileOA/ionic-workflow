angular.module('starter.controllers', [])

    .controller('HomeCtrl', function($scope, $state, AllRequestStatus) {
      $scope.allRequestStatus = AllRequestStatus.allRequestStatus();
      $scope.newRequest = function(){
        $state.go('tab.request-create');
      }
    })

    /*
    .controller('HomeCtrl', function($scope, $ionicPlatform,$cordovaSQLite){
        $scope.allRequestStatus = [];
        $ionicPlatform.ready(function(){
            var query = "SELECT status_id, status_title, status_total FROM tblRequestStatus";
            $cordovaSQLite.execute(db, query, []).then(function(res){
                if(res.rows.length > 0){
                    for(var i = 0; i < res.rows.length; i++){
                        $scope.allRequestStatus.push({id: res.rows.item(i).status_id, title: res.rows.item(i).status_title, total: res.rows.item(i).status_total});
                    }
                }
            })
        },function(error){
            console.error(error);
        })
    })
    */

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

    .controller('RequestDetailCtrl', function($ionicHistory,$scope,$state,$stateParams, Requests, AllRequestStatus){
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
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
            AllRequestStatus.updateRequestStatusCount(preRequestStatusId, Requests.getStatusRequests(preRequestStatusId));
            AllRequestStatus.updateRequestStatusCount($scope.request.requestStatusId, Requests.getStatusRequests($scope.request.requestStatusId));
            $state.go('tab.home',{reload: true});
        }
    })
    .controller('SettingsCtrl', function($scope){})
    .controller('AccountCtrl', function($scope){});