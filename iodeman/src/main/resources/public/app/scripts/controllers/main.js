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
	$scope.connected = false;

    $scope.dtOptions = {
    	info : false,
    	paging : false,
		search : true,
		language : {
    		search : "",
    		searchPlaceholder : "Recherche...",
            zeroRecords: "Aucun planning pour cette recherche.",
			emptyTable: "Vous n'avez aucun planning."
		},
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
		$log.debug("test")
        var fileURL = backendURL + 'planning/' + id + '/export';

        $http.get(backendURL + 'planning/find/' + id).success(function(data) {
            $log.debug(data);
            var planning = data;
            var errorNoParticipant = false;
            var errorNoRoom = false;

            if (planning.participants == null || planning.participants.length == 0) {
                errorNoParticipant = true;
                return;
            }

            if (planning.rooms == null || planning.rooms.length == 0) {
                errorNoRoom = true;
                return;
            }

            $http.get(backendURL + 'planning/' + id + '/validate')
                .success(function(data) {
                    $log.debug("test2");

                    console.log(data);
                    document.location.href = fileURL;
                })
                .error(function(data) {
                    console.log(data);
                });
        }).error(function(data) {
            $log.debug(data);
            $log.debug("Error !");
        });
    };
});