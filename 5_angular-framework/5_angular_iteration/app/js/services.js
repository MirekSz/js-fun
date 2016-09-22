'use strict';

/* Services */

var appServices = angular.module('appServices', []);

appServices.service('UserService', ['$resource',
    function ($resource) {
        return $resource('http://localhost:3000/users/:id', {id: '@id'} );
    }]);


appServices.service('UserServiceHttp', ['$http',
    function ($http) {
        this.getUsers = function () {
            return $http({method: 'GET', url: 'http://localhost:3000/users:id'});
        }
    }]);