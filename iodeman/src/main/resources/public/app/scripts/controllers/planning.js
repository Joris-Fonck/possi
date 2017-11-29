'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * Controller of the publicApp
 */
angular.module('publicApp').controller('PlanningCtrl', function ($scope, backendURL, $http, $routeParams, Flash) {
	$scope.reinitialize = function() {
		$http.get(backendURL + 'planning/' + $scope.id + '/deleteBackup');
	}
});
