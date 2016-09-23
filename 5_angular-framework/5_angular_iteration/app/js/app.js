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
        $routeProvider.when('/form/:mode/:id?', {
            templateUrl: 'partials/form-view.html',
            controller: 'FormCtrl'
        }).when('/users', {
            templateUrl: 'partials/users-table.html',
            controller: 'UsersTableCtrl as ctrl'
        }).otherwise({
            redirectTo: '/users'
        });
    }]);
