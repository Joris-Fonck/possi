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
    		searchPlaceholder : "Recherche ..."
		},
    };

	$http.get(backendURL + 'plannings/exported').success(function(data) {
		$scope.exported = data.keys;
	});

	$http.get(backendURL + 'user').success(function(data) {
	    $scope.user = data;
	});

	$http.get(backendURL + 'planning/list').success(function(data) {
        $log.debug(data);

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

    $scope.validate = function() {
        $http.get(backendURL + 'planning/find/' + $scope.id).success(function(data) {
            $scope.planning = data;
            $scope.errorValidate = false;
            $scope.errorNoParticipant = false;
            $scope.errorNoRoom = false;

            if ($scope.participants == null || $scope.participants.length == 0) {
                $scope.errorNoParticipant = true;
                return;
            }

            if ($scope.planning.rooms == null || $scope.planning.rooms.length == 0) {
                $scope.errorNoRoom = true;
                return;
            }

            $http.get(backendURL + 'planning/' + $scope.id + '/validate')
                .success(function(data) {
                    console.log(data);
                    document.location.href = $scope.fileURL;
                })
                .error(function(data) {
                    console.log(data);
                });
        });
    };
});