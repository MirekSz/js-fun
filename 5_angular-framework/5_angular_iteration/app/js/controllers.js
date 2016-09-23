'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('UsersTableCtrl', ['$scope', 'UserService', '$location', '$timeout',
    function ($scope, UserService, $location, $timeout) {
        this.loadUsers = function () {
            $scope.loading = true;
            $scope.isUserSelected = false;
            $scope.selectedUser = {};
            $scope.users = UserService.query(function () {
                $scope.loading = false;
            });
            $scope.checkForUsers();
        };

        $scope.checkForUsers = function () {
            $timeout(function () {
                $scope.loading = true;
                $scope.users = UserService.query(function () {
                    $scope.loading = false;
                    $scope.checkForUsers();
                });
            }, 10000);
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
appControllers.controller('FormCtrl', ['$scope', 'UserService', '$routeParams', '$location',
    function ($scope, UserService, $routeParams, $location) {

        console.log($routeParams.id + $routeParams.mode);

        $scope.mode = $routeParams.mode;

        if ($scope.mode === 'Edytuj') {
            $scope.user = UserService.get({id: $routeParams.id});
        } else {
            $scope.user = {};
        }

        $scope.saveUser = function (user) {
            if ($scope.mode === 'Edytuj') {
                UserService.editUser(user).$promise.then(function () {
                    $location.path('/users');
                });
            } else {
                UserService.save(user).$promise.then(function () {
                    $location.path('/users');
                });
            }
        };

        $scope.cancelForm = function () {
            $location.path('/users');
        };
    }]);
