'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('UsersTableCtrl', ['$scope', 'UserService',
    function ($scope, UserService) {
        this.loadUsers = function () {
            $scope.loading = true;
            $scope.isUserSelected = false;
            $scope.selectedUser = {};
            $scope.users = UserService.query(function () {
                $scope.loading = false;
            });
        };

        $scope.deleteBtnClick = function () {
            if (confirm('Czy chcesz usunąć tego użytkownika?')) {
                console.log('deleting user: ' + $scope.selectedUser.id);
                UserService.remove($scope.selectedUser, this.loadUsers.bind(this));
            }
        }.bind(this);

        this.loadUsers();
    }]);
appControllers.controller('FormCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.mode = $routeParams.mode;
    }]);
