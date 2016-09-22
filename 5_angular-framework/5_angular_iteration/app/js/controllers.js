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
            console.log('deleteBtn clicked');
            if (confirm('Czy chcesz usunąć tego użytkownika?')) {
                UserService.remove($scope.selectedUser.id);
                this.loadUsers();
            }
        }.bind(this);

        this.loadUsers();
    }]);
appControllers.controller('FormCtrl', ['$scope', '$routeParams',
    function ($scope, $routeParams) {
        $scope.mode = $routeParams.mode;
    }]);
