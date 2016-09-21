'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('tableView', function() {
    return {
        templateUrl: '/app/templates/tableView.html',
        restrict: 'AE',
        link: function ($scope, element, attrs) {
            $scope.rowClicked = function(user) {
                $scope.selectedUser = user;
                console.log(user.name);
            }
        }
    };
});