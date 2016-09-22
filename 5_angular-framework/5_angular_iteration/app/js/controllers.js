'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('UsersTableCtrl', ['$scope', 'UserService', 'UserServiceHttp',
    function ($scope, UserService, UserServiceHttp) {

        $scope.loading = true;
        // var User = UserService.getUser();
        // $scope.users = User.query(function () {
        //     $scope.loading = false;
        // });
        UserServiceHttp.getUsers().then(function (response) {
            $scope.users = response.data;
            $scope.loading = false;
        });
        $scope.isUserSelected = false;
        $scope.query = '';
    }]);
appControllers.controller('FormCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.mode = $routeParams.mode;
    }]);
