'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('UsersTableCtrl', ['$scope','UserService',
    function ($scope, UserService) {

        $scope.loading = true;
        $scope.users = UserService.getUsers(function () {
            $scope.loading = false;
        });
        $scope.isUserSelected = false;
    }]);
appControllers.controller('FormCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.mode = $routeParams.mode;
    }]);
