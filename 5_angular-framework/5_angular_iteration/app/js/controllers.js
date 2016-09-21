'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('UsersTableCtrl', ['$scope',
    function ($scope) {
        $scope.users = [{id: 2, name: 'John', surname: 'Doe', age: 43, sex: 'Mężczyzna'},
            {id: 3, name: 'John', surname: 'Doe', age: 45, sex: 'Mężczyzna'}];
        $scope.loading = false;
    }]);
