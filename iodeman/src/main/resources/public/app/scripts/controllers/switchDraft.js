/**
 * Created by dania on 17/01/17.
 */
angular.module('publicApp').controller('SwitchDraftCtrl', function($scope, $window, $http, backendURL,Auth, $routeParams, $location){
    $scope.id = $routeParams.idDraft;

    $http.get(backendURL + 'planning/switchReference/' + $scope.id).success(function() {
        $location.path ("/");
    }).error(function () {
        console.log("KO");
    });
});
