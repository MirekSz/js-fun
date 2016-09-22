'use strict';

/* Directives */

var appDirectives = angular.module('appDirectives', []);

appDirectives.directive('tableView', function() {
    return {
        templateUrl: '/app/templates/tableView.html',
        restrict: 'E',
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
        restrict: 'E',
        scope: {
            user: '=',
            visible: '='
        }
    };
});
appDirectives.directive('buttonView', function() {
    return {
        templateUrl: '/app/templates/buttonView.html',
        restrict: 'E'
    };
});