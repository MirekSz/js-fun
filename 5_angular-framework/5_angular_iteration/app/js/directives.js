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
                console.log('User Selected:' + user.name + user.surname + user.id);
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
        restrict: 'E',
        scope: {
            isUserSelected: '=',
            deleteBtnClick: '='
        }
    };
});