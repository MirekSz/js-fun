'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
    'ngRoute',
    'ngResource',
    'appControllers',
    'phonecatFilters',
    'appDirectives',
    'appServices'
]);

phonecatApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/users', {
            templateUrl: 'partials/users-table.html',
            controller: 'UsersTableCtrl as ctrl'
        }).when('form/:mode/:userId', {
            templateUrl: 'partials/phone-detail.html',
            controller: 'FormCtrl'
        }).otherwise({
            redirectTo: '/users'
        });
    }]);
