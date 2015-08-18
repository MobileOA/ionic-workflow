angular.module('starter.services', [])

    .factory('AllRequestStatus', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var empty_allRequestStatus = [{
        id: 0,
        title: 'Inbox',
        icon: 'inbox',
        totalNumber: 0
      }, {
        id: 1,
        title: 'Approved',
        icon: 'approved',
        totalNumber: 0
      }, {
        id: 2,
        title: 'Rejected',
        icon: 'rejected',
        totalNumber: 0
      }, {
        id: 3,
        title: 'Outbox',
        icon: 'outbox',
        totalNumber: 0
      }];

      var getAllRequestStatus = function () {
        var allRequestStatusString = window.localStorage['allRequestStatus'];
        if (allRequestStatusString) {
          var allRequestStatus = angular.fromJson(allRequestStatusString);

          return allRequestStatus;
        }

        return empty_allRequestStatus;
      };

      var getRequestStatusWithIndex = function (requestStatusId) {
        var allRequestStatus = getAllRequestStatus();
        var requestStatusWithIndex = {index: 0, requestStatus: {}};

        for (i = 0; i < allRequestStatus.length; i++) {
          if (allRequestStatus[i].id == requestStatusId) {
            requestStatusWithIndex = {index: i, requestStatus: allRequestStatus[i]};
            return requestStatusWithIndex;
          }
        }
      };

      var saveAllRequestStatus = function (allRequestStatus) {
        window.localStorage['allRequestStatus'] = angular.toJson(allRequestStatus);
      };

      var updateRequestStatusCount = function(requestStatusId, statusRequests){
        var requestStatusWithIndex = getRequestStatusWithIndex(requestStatusId);
        var allRequestStatus = getAllRequestStatus();

        var modifyStatusIndex = requestStatusWithIndex.index;
        allRequestStatus[modifyStatusIndex].totalNumber = statusRequests.length;
        saveAllRequestStatus(allRequestStatus);
      };

      return {
        allRequestStatus: getAllRequestStatus,
        getRequestStatusWithIndex: getRequestStatusWithIndex,
        saveAllRequestStatus: saveAllRequestStatus,
        updateRequestStatusCount: updateRequestStatusCount
      };
    })

.factory('Request', function(){
      
});

