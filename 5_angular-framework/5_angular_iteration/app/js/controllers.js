'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('UsersTableCtrl', ['$scope', 'UserService', '$location',
    function ($scope, UserService, $location) {
        this.loadUsers = function () {
            $scope.loading = true;
            $scope.isUserSelected = false;
            $scope.selectedUser = {};
            $scope.users = UserService.query(function () {
                $scope.loading = false;
            });
        };

        $scope.editBtnClick = function () {
            $location.path('/form/Edytuj/' + $scope.selectedUser.id);
        };

        $scope.deleteBtnClick = function () {
            if (confirm('Czy chcesz usunąć tego użytkownika?')) {
                UserService.remove($scope.selectedUser, this.loadUsers.bind(this));
            }
        }.bind(this);

        this.loadUsers();
    }]);
appControllers.controller('FormCtrl', ['$scope', '$routeParams', 'UserService', '$location',
    function ($scope, UserService, $routeParams, $location) {

        console.log($routeParams.id + $routeParams.mode);

        $scope.mode = $routeParams.mode;

        if ($scope.mode === 'Edytuj') {
            $scope.userId = $routeParams.id;
            $scope.user = UserService.get($scope.userId);
        } else {
            $scope.user = {};
        }

        $scope.saveUser = function (user) {
            if ($scope.mode === 'Edytuj') {
                UserService.editUser(user);
            } else {
                UserService.save(user);
            }
            $location.path('/users');
        };

        $scope.cancelForm = function () {
            $location.path('/users');
        };
    }]);
