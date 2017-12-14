'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:UnavailabilitiesCtrl
 * @description
 * # UnavailabilitiesCtrl
 * Controller of the publicApp
 */
angular.module('publicApp').controller('UnavailabilitiesCtrl', function ($scope, $log, backendURL, $http, $routeParams, $timeout, Flash, $filter) {
    $scope.id = $routeParams.idPlanning;
    $scope.days = "";

    $http.get(backendURL + 'user').success(function (data) {
        $scope.user = data;
    });

    $http.get(backendURL + 'planning/find/' + $scope.id).success(function (data) {
        $scope.planning = data;
    });

    //Récupération des participants avec leurs indispos
    $http.get(backendURL + 'planning/' + $scope.id + '/participants/unavailabilities').success(function(data) {
        $scope.participants = data;
    });

    $scope.submit = function () {
        $scope.days.each(function (d) {
            d.pushToServer();
        });
        Flash.create('success', '<strong> Modifications effectu&eacute;es!</strong> Les disponibilit&eacute;s ont &eacute;t&eacute; mises &agrave; jours.');
        $timeout(function () {
            $http.get(backendURL + 'planning/' + $scope.id + '/participants/unavailabilities').success(function(data) {
                $scope.participants = data;
            });

            $('#modalUnavailabilities').modal('toggle');
        }, 1500);
    }

    $scope.isBeforeLunchBreak = function () {
        return function (entry) {
            if ($scope.planning.lunchBreak != null) {
                var fromLunchBreak = $filter('date')($scope.planning.lunchBreak.from, "HH");
                var from = entry.line.substr(0, 2);

                return from < fromLunchBreak;
            } else {
                return true;
            }
        };
    }

    $scope.isAfterLunchBreak = function () {
        return function (entry) {
            if ($scope.planning.lunchBreak != null) {
                var toLunchBreak = $filter('date')($scope.planning.lunchBreak.to, "HH");
                var to = entry.line.substr(8, 10);

                return to >= toLunchBreak;
            } else {
                return true;
            }
        };
    }

    $scope.showUnavailabilities = function(participant, userrole) {
        $timeout(function() {
            $scope.currentUser = participant;
            $scope.role = userrole;
            if (userrole === "PROF") {
                $http.get(backendURL + 'unavailability/agenda/' + $scope.id + '/' + $scope.currentUser.uid).success(function (data) {
                    console.log("agenda found!");
                    console.log(data);
                    $("#unavailibities-spinner").remove();

                    $scope.agenda = data;
                    $scope.columns = data.map(function(l) {
                        return l.days.map(function(d) {
                            return d.day;
                        });
                    }).flatten().unique();
                    $scope.days = data.map(function(l) {
                        return l.days;
                    }).flatten();
                    $scope.days.each(function (d) {
                        // add an action for each clic on a checkbox
                        d.pushToServer = function() {
                            $log.debug($scope.currentUser.uid);

                            if (d.checked) {
                                $http.get(backendURL + 'unavailability/' + $scope.id + "/create", {
                                        params: {
                                            'person': $scope.currentUser.uid,
                                            'periodStart': Date.create(d.timebox.from).toISOString(),
                                            'periodEnd': Date.create(d.timebox.to).toISOString()
                                        }
                                    }
                                );
                            } else {
                                $http.get(backendURL + 'unavailability/' + $scope.id + "/delete", {
                                        params: {
                                            'person': $scope.currentUser.uid,
                                            'periodStart': Date.create(d.timebox.from).toISOString(),
                                            'periodEnd': Date.create(d.timebox.to).toISOString()
                                        }
                                    }
                                );
                            }
                        };
                    });
                    $scope.submitColumn = function(c) {
                        // add an action for each clic on a column
                        var daysOfColumn = $scope.days.filter(function(d) {
                            return d.day == c;
                        });
                        daysOfColumn.each(function(d) {
                            d.checked = !d.checked;
                            //d.submit();
                        });
                    };
                    $scope.agenda.each(function(l) {
                        // add an action for each clic on a line
                        l.submit = function() {
                            l.days.each(function(d) {
                                d.checked = !d.checked;
                                //d.submit();
                            });
                        };
                    });
                });
            } else {
                $http.get(backendURL + 'unavailability/agenda/' + $scope.id + '/' + $scope.currentUser.uid).success(function (data) {
                    $("#unavailibities-spinner").remove();
                    $scope.agenda = data;
                    $scope.columns = data.map(function(l) {
                        return l.days.map(function(d) {
                            return d.day;
                        });
                    }).flatten().unique();
                    $scope.days = data.map(function(l) {
                        return l.days;
                    }).flatten();
                    $scope.days.each(function (d) {
                        // add an action for each clic on a checkbox
                        d.pushToServer = function() {
                            if (d.checked) {
                                $http.get(backendURL + 'unavailability/' + $scope.id + "/create", {
                                        params: {
                                            'person': $scope.currentUser.uid,
                                            'periodStart': Date.create(d.timebox.from).toISOString(),
                                            'periodEnd': Date.create(d.timebox.to).toISOString()
                                        }
                                    }
                                );
                            }else{
                                $http.get(backendURL + 'unavailability/'+$scope.id+"/delete", {
                                        params: {
                                            'person': $scope.currentUser.uid,
                                            'periodStart': Date.create(d.timebox.from).toISOString(),
                                            'periodEnd': Date.create(d.timebox.to).toISOString()
                                        }
                                    }
                                );
                            }
                        };
                    });
                    $scope.submitColumn = function(c) {
                        // add an action for each clic on a column
                        var daysOfColumn = $scope.days.filter(function(d) {
                            return d.day == c;
                        });
                        daysOfColumn.each(function(d) {
                            d.checked = !d.checked;
                            //d.submit();
                        });
                    };
                    $scope.agenda.each(function(l) {
                        // add an action for each clic on a line
                        l.submit = function() {
                            l.days.each(function(d) {
                                d.checked = !d.checked;
                                //d.submit();
                            });
                        };
                    });
                });
            }
        }, 250);
    }
});