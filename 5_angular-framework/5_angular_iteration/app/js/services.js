'use strict';

/* Services */

var appServices = angular.module('appServices', []);

appServices.service('UserService', ['$resource',
    function ($resource) {
        this.obj = $resource('http://localhost:3000/users');
        this.getUser = function () {
            return this.obj
        };
    }]);


appServices.service('UserServiceHttp', ['$http',
    function ($http) {
        this.getUsers = function () {
            return $http({method: 'GET', url: 'http://localhost:3000/users'});
        }
    }]);