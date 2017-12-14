'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */
angular.module('publicApp', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ui.bootstrap',
	'flash',
	'angularjs-dropdown-multiselect',
	'ngStorage',
	'ngLocale',
	'dndLists',
    'datatables'
])

.constant("backendURL", "http://localhost:8080/")
.constant("backendURL2", "http://possi-test.istic.univ-rennes1.fr:8080/")

.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'mainCtrl'
        })
        .when('/planning/create', {
            templateUrl: 'app/views/createPlanning.html',
            controller: 'CreatePlanningCtrl',
            controllerAs: 'createPlanningCtrl'
        })
        .when('/planning/create/participant/:idPlanning', {
            templateUrl: 'app/views/participant.html',
            controller: 'ParticipantCtrl',
            controllerAs: 'participantCtrl'
        })
        .when('/planning/create/configuration/:idPlanning', {
            templateUrl: 'app/views/configuration.html',
            controller: 'ConfigurationCtrl',
            controllerAs: 'configurationCtrl'
        })
        .when('/planning/participant/:idPlanning', {
            templateUrl: 'app/views/participant.html',
            controller: 'ParticipantCtrl',
            controllerAs: 'participantCtrl'
        })
        .when('/planning/configuration/:idPlanning', {
            templateUrl: 'app/views/configuration.html',
            controller: 'ConfigurationCtrl',
            controllerAs: 'configurationCtrl'
        })
        .when('/planning/check/:idPlanning', {
            templateUrl: 'app/views/planningCheckmark.html',
            controller: '',
            controllerAs: ''
        })
        .when('/planning/draft/:idPlanning', {
            templateUrl: 'app/views/draft.html',
            controller: 'DraftCtrl',
            controllerAs: 'draftCtrl'
        })
        .when('/generatedPlanning/:idPlanning', {
            templateUrl: 'app/views/generatedPlanning.html',
            controller: 'GeneratedPlanningCtrl',
            controllerAs: 'generatedPlanningCtrl'
        })
        .when('/generatedDraft/:idPlanning', {
            templateUrl: 'app/views/generatedDraft.html',
            controller: 'GeneratedDraftCtrl',
            controllerAs: 'generatedDraftCtrl'
        })
        .when('/planning/:idPlanning/unavailabilities', {
            templateUrl: 'app/views/unavailabilities.html',
            controller: 'UnavailabilitiesCtrl',
            controllerAs: 'unavailabilitiesCtrl'
        })
        .when('/duplicatePlanning/:idPlanning', {
            templateUrl: 'app/views/draft.html',
            controller: 'DuplicatePlanningCtrl',
            controllerAs: 'duplicatePlanningCtrl'
        })
        .when('/duplicateDraft/:idPlanning', {
            templateUrl: 'app/views/draft.html',
            controller: 'DuplicateDraftCtrl',
            controllerAs: 'duplicateDraftCtrl'
        })
        .when('/planning/switchDraft/:idDraft', {
            templateUrl: 'app/views/draft.html',
            controller: 'SwitchDraftCtrl',
            controllerAs: 'switchDraftCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
})

.filter('emailToName', function() {
  return function(input) {
	  if(input == null) {
		  return input;
	  }
	  return input.split("@")[0].replace('.', ' ');
  }
})

.filter('capitalize', function() {
	return function(input, all) {
		var reg = (all) ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
		return (!!input) ? input.replace(reg, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
	}
})

.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
	$rootScope.$on('$routeChangeStart', function (event) {
		Auth.login();
	});
}])

.directive('ngConfirmClick', [function() {
	return {
		link: function (scope, element, attr) {
			var msg = attr.ngConfirmClick || "Êtes-vous sûr ?";
			var clickAction = attr.confirmedClick;

			element.bind('click',function () {
				if (window.confirm(msg)) {
					scope.$eval(clickAction)
				}
			});
		}
	};
}]);