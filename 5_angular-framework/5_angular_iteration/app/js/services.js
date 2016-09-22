'use strict';

/* Services */

var appServices = angular.module('appServices', []);

appServices.service('UserService', ['$resource',
    function ($resource) {
        var User = $resource('http://localhost:3000/users');

        this.addUser = User.save;
        this.getUsers = User.query;
        this.deleteUser = User.remove;
    }]);