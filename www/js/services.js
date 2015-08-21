angular.module('starter.services', [])

    .factory('AllRequestStatus', function() {
      // Might use a resource here that returns a JSON array

      // Some fake testing data
      var empty_allRequestStatus = [{
        id: 0,
        title: 'Inbox',
        icon: 'inbox',
        status: 'Pending for approval',
        totalNumber: 0
      }, {
        id: 1,
        title: 'Approved',
        icon: 'approved',
        status: 'Approved',
        totalNumber: 0
      }, {
        id: 2,
        title: 'Rejected',
        icon: 'rejected',
        status: 'Rejected',
        totalNumber: 0
      }, {
        id: 3,
        title: 'Outbox',
        icon: 'outbox',
        status: '',
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

.factory('Requests', function(AllRequestStatus){
      var getAllRequests = function() {

        var requestsString = window.localStorage['requests'];
        if (requestsString) {
          var requests = angular.fromJson(requestsString);
          return requests;
        } else {
          return [];
        }
      };

      var getStatusRequests = function (requestStatus) {
        var allRequests = getAllRequests();
        var statusRequests = [];

        for (i=0; i<allRequests.length; i++) {
          if(allRequests[i].requestStatus == requestStatus) {
            statusRequests.push(allRequests[i])
          }
        }
      };

      var getRequestWithIndex = function(requestId){
        var allRequests = getAllRequests();
        var requestWithIndex = {index:0, request:{}};

        for (i=0; i<allRequests.length; i++) {
          if(allRequests[i].requestId == requestId) {
            requestWithIndex = {index:i, request:allRequests[i]};
            return requestWithIndex;
          }
        }
      };

      var saveRequests = function(requests) {
        window.localStorage['requests'] = angular.toJson(requests);
      };

      return {
        getAllRequests: getAllRequests,
        getStatusRequests: getStatusRequests,
        getRequestWithIndex: getRequestWithIndex,
        saveRequests: saveRequests,
        newRequest: function () {
          return {
            requestId: 0,
            requestStatus: 'New',
            leaveType: '',
            leaveFrom: '',
            leaveTo: '',
            leaveReason: '',
            leaveBalance: '',
            raisedBy: 'Lauro Li',
            raisedOn: '2015/08/12'
          }
        },
        getLastRequestId: function(){
          return parseInt(window.localStorage['lastRequestId']) || 0;
        },
        setLastRequestId: function(index){
          window.localStorage['lastRequestId'] = index;
        }
      }
});

