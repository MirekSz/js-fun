'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('UsersTableCtrl', ['$scope', 'UserService', '$window',
    function ($scope, UserService, $window) {
        this.loadUsers = function () {
            $scope.loading = true;
            $scope.isUserSelected = false;
            $scope.selectedUser = {};
            $scope.users = UserService.query(function () {
                $scope.loading = false;
            });
        };

        $scope.addBtnClick = function () {
            $window.location.assign('app/#/form/Dodaj');
        };

        $scope.editBtnClick = function () {
            $window.location.assign('app/#/form/Edytuj/' + $scope.selectedUser.id);
        };

        $scope.deleteBtnClick = function () {
            if (confirm('Czy chcesz usunąć tego użytkownika?')) {
                UserService.remove($scope.selectedUser, this.loadUsers.bind(this));
            }
        }.bind(this);

        this.loadUsers();
    }]);
appControllers.controller('FormCtrl', ['$scope', '$routeParams', 'UserService', '$window',
    function ($scope, UserService, $routeParams, $window) {
        var User = UserService();

        $scope.mode = $routeParams.mode;
        if ($scope.mode === 'Edytuj') {
            $scope.userId = $routeParams.id;
            $scope.user = User.get($scope.userId);
        } else {
            $scope.user = {};
        }

        $scope.saveUser = function (user) {
            if ($scope.mode === 'Edytuj') {
                User.editUser(user);
            } else {
                User.save(user);
            }
            $window.location.assign('/app/#/users');
        };

        $scope.cancelForm = function () {
            $window.location.assign('/app/#/users');
        };
    }]);
