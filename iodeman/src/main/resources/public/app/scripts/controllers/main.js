'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the publicApp
 */
angular.module('publicApp').controller('MainCtrl', function ($scope, $rootScope, $http, $log, backendURL, Auth, $sessionStorage) {
	$.material.init();

    $scope.dtOptions = {
    	info : false,
    	paging : false,
		search : true,
		language : {
    		search : "",
    		searchPlaceholder : "Recherche...",
            zeroRecords: "Aucun planning pour cette recherche.",
			emptyTable: "Vous n'avez aucun planning."
		}
    };

	$http.get(backendURL + 'plannings/exported').success(function(data) {
		$scope.exported = data.keys;
	});

	$http.get(backendURL + 'user').success(function(data) {
	    $scope.user = data;
	});

	$http.get(backendURL + 'planning/list').success(function(data) {
		$scope.plannings = data;
		$scope.connected = true;

		$("#home-spinner").remove();
	}).error(function() {
        $scope.connected = false;
	});

	$scope.closeHomeInfo = function() {
		$("#home-info").fadeOut(300, function() { $(this).remove(); });
	};

	$scope.remove = function(id) {
		$log.debug(backendURL + 'planning/' + id + '/delete');

		$http.get(backendURL + 'planning/' + id + '/delete').success(function () {
			for(var i = $scope.plannings.length - 1; i >= 0; i--) {
			    if($scope.plannings[i].id === id) {
			    	$scope.plannings.splice(i, 1);
			    }
			}
		});
	}

    $scope.validate = function(id) {
        var fileURL = backendURL + 'planning/' + id + '/export';

        $http.get(backendURL + 'planning/find/' + id).success(function(data) {
            var planning = data;
            $scope.errorNoParticipant = false;
            $scope.errorNoRoom = false;

            if (planning.participants == null || planning.participants.length == 0) {
                $scope.errorNoParticipant = true;
                return;
            }

            if (planning.rooms == null || planning.rooms.length == 0) {
                $scope.errorNoRoom = true;
                return;
            }

            $http.get(backendURL + 'planning/' + id + '/validate')
                .success(function(data) {
                    console.log(data);
                    document.location.href = fileURL;
                })
                .error(function(data) {
                    console.log(data);
                });
        });
    };
});
