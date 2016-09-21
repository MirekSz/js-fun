'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('tableView', function() {
    return {
        templateUrl: '/app/templates/tableView.html',
        restrict: 'AE',
        transclude: true,
        link: function ($scope) {
            $scope.rowClicked = function(user) {
                $scope.selectedUser = user;
                $scope.isUserSelected = true;
            }
        }
    };
});

appDirectives.directive('detailsView', function() {
    return {
        templateUrl: '/app/templates/detailsView.html',
        restrict: 'AE'
    };
});