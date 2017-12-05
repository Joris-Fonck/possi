'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:ImportCtrl
 * @description
 * # ImportCtrl
 * Controller of the publicApp
 */
angular.module('publicApp').controller('ParticipantCtrl', function ($scope, $location, $log, $http, backendURL, Auth, $routeParams, $timeout) {
    var inputFile = $('#upload_file');
    var formUpload = $('#formUpload');

    $scope.id = $routeParams.idPlanning;
    $scope.uploadFileURL = backendURL + 'upload';

    //On vérifie que l'on est en train de créer un planning
    if($location.url().search("/create/") == -1) {
        $('.wizard-inner').css('display', 'none');
    } else {
        $('.back_arrow').css('display', 'none');
    }

    if($routeParams.import == "nok") {
        $scope.errorImport = true;
    }

    $http.get(backendURL + 'user').success(function(data) {
        $scope.user = data;
        $http.get(backendURL + 'planning/find/' + $scope.id).success(function(data) {
            $scope.planning = data;

            $timeout(verifyAdmin(), 100);
        });

        $http.get(backendURL + 'planning/' + $scope.id + '/exported').success(function (data) {
            $scope.isGenerated = data;
        });
    });

    $scope.showImportButton = true;

    var verifyAdmin = function() {
        if($scope.user.uid != $scope.planning.admin.uid) {
            document.location.href = "#/";
        }
    };

    $http.get(backendURL + 'planning/' + $scope.id + '/participants/unavailabilities')
        .success(function(data) {
            $scope.participants = data;
                console.log("Hello", $scope.participants);
            if($scope.participants.length > 0) {
                $scope.showImportButton = false;

                if($location.url().search("/create/") == -1) {
                    $scope.showConfigButton = false;
                }
            }
        })
        .error(function() {
            $scope.noParticipants = true;
        });

    $scope.importParticipants = function() {
        inputFile.click();
    };

    $scope.notZeroUnaivability = function(dispoNumber) {
        var greenStyle = "'background-color' : 'green'";

        if(dispoNumber > 0) {
            return "{"+greenStyle+"}";
        }

        return "";
    };

    inputFile.change(function() {
        formUpload.submit();
    });

    $scope.showUnavailabilities = function(participant, userrole) {
        $timeout(function() {
            $scope.currentUser = participant;
            $scope.role = userrole;
            if (userrole === "PROF"){
                $http.get(backendURL + 'unavailability/agenda/' + $scope.id + '/' + participant.followingTeacher.person.uid).success(function (data) {
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
                            console.log('submit !');
                            var request = null;
                            if (d.checked) {
                                $http.get(backendURL + 'unavailability/' + $scope.id + "/create", {
                                        params: {
                                            'person': $scope.uid,
                                            'periodStart': Date.create(d.timebox.from).toISOString(),
                                            'periodEnd': Date.create(d.timebox.to).toISOString()
                                        }
                                    }
                                );
                            }else{
                                $http.get(backendURL + 'unavailability/'+$scope.id+"/delete", {
                                        params: {
                                            'person': $scope.uid,
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

            else {
                $http.get(backendURL + 'unavailability/agenda/' + $scope.id + '/' + participant.student.person.uid).success(function (data) {
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
                            console.log('submit !');
                            var request = null;
                            if (d.checked) {
                                $http.get(backendURL + 'unavailability/' + $scope.id + "/create", {
                                        params: {
                                            'person': $scope.uid,
                                            'periodStart': Date.create(d.timebox.from).toISOString(),
                                            'periodEnd': Date.create(d.timebox.to).toISOString()
                                        }
                                    }
                                );
                            }else{
                                $http.get(backendURL + 'unavailability/'+$scope.id+"/delete", {
                                        params: {
                                            'person': $scope.uid,
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